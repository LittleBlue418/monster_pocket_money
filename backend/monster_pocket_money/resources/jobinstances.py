import traceback
from flask_restful import Resource, reqparse
from pymongo.collection import ObjectId

from monster_pocket_money.models import mongo, ValidationError, strip_objectid
from monster_pocket_money.models.jobinstance import JobInstanceModel
from monster_pocket_money.models.jobs import JobsModel
from monster_pocket_money.models.profiles import ProfilesModel


class JobInstance(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('participant_ids',
                        # [ '_id' , '_id' ]
                        action='append',
                        required=True,
                        help='Job must have participants')

    def get(self, jobinstance_id):
        """ Return a specific job instance """

        jobinstance = next(mongo.db.jobinstances.aggregate([
            {
                '$match': {
                    '_id': ObjectId(jobinstance_id)
                }
            }, {
                '$lookup': {
                    'from': 'profiles',
                    'localField': 'participant_ids',
                    'foreignField': '_id',
                    'as': 'participants'
                }
            }, {
                '$lookup': {
                    'from': 'jobs',
                    'localField': 'job_id',
                    'foreignField': '_id',
                    'as': 'job'
                }
            }, {
                '$unwind': {
                    'path': '$job'
                }
            }
        ]))

        # print(jobinstance)

        if jobinstance is None:
            return {"message": "A job with that ID does not exist"}, 404

        # stripped_jobinstance =

        return strip_objectid(jobinstance)

    def put(self, jobinstance_id):
        """ Edit the participants in a job instance """
        request_data = JobInstance.parser.parse_args()

        try:
            with mongo.cx.start_session() as session:
                with session.start_transaction():

                    job_instance = JobInstanceModel.find_by_id(jobinstance_id)

                    if not job_instance:
                        return {"message": "A job instance with that ID does not exist"}, 404

                    if job_instance["is_approved"]:
                        return {"message": "already approved"}, 400

                    if not request_data["participant_ids"]:
                        return {"message": "A job instance must have participants"}, 400

                    for participant_id in request_data["participant_ids"]:
                        if not ProfilesModel.find_by_id(participant_id):
                            return {"message": f"Participant {participant_id} not found in database"}

                    # Updating the job instance
                    job_instance["participant_ids"] = [
                        ObjectId(participant_id)
                        for participant_id in request_data["participant_ids"]
                    ]

                    mongo.db.jobinstances.update({"_id": ObjectId(jobinstance_id)}, job_instance)

                    return strip_objectid(job_instance)

        except ValidationError as error:
            return {"message": error.message}, 400

        except Exception as error:
            traceback.print_exc(error)
            return {"message": "unknown error"}, 500

    def delete(self, jobinstance_id):
        """ Delete a specific job instance """
        jobinstance = JobInstanceModel.find_by_id(jobinstance_id)

        if jobinstance is None:
            return {"message": "Job instance has already been deleted"}

        mongo.db.jobinstances.remove({"_id": ObjectId(jobinstance_id)})

        return {"message": "Job instance deleted"}


class ApproveJobInstance(Resource):

    def post(self, jobinstance_id):
        """ Endpoint to approve a job instance where no edit required """

        try:
            with mongo.cx.start_session() as session:
                with session.start_transaction():

                    job_instance = JobInstanceModel.find_by_id(jobinstance_id)

                    if not job_instance:
                        return {"message": "A job instance with that ID does not exist"}, 404

                    # Update JOBINSTANCE
                    if job_instance["is_approved"]:
                        return {"message": "already approved"}, 400

                    job_instance["is_approved"] = True

                    mongo.db.jobinstances.update({"_id": ObjectId(jobinstance_id)}, job_instance)

                    # Update PROFILES
                    job_id = str(job_instance["job_id"])
                    job = JobsModel.find_by_id(job_id)

                    for profile_id in job_instance["participant_ids"]:

                        updated_profile = ProfilesModel.find_by_id(profile_id)

                        # Completed Jobs
                        if job_id in updated_profile["completed_jobs"]:
                            updated_profile["completed_jobs"][job_id]["number_completed_instances"] += 1
                        else:
                            updated_profile["completed_jobs"][job_id] = {
                                "job_name": job["name"],
                                "number_completed_instances": 1
                            }

                        # Money Owed
                        updated_profile["money_owed"] += job["reward"]

                        # Total_money_earned
                        updated_profile["total_money_earned"] += job["reward"]
                        print(updated_profile)
                        mongo.db.profiles.update({"_id": profile_id}, updated_profile)

                    return strip_objectid(job_instance)

        except Exception as error:
            traceback.print_exc(error)
            return {"message": "unknown error"}, 500

        return "foo bar"


class JobInstancesCollection(Resource):

    def get(self):
        """ Return all job instances """
        try:
            jobinstances = [
                strip_objectid(jobinstance)
                for jobinstance in mongo.db.jobinstances.aggregate([
                    {
                        '$match': {
                            'is_approved': False
                        }
                    }, {
                        '$lookup': {
                            'from': 'profiles',
                            'localField': 'participant_ids',
                            'foreignField': '_id',
                            'as': 'participants'
                        }
                    }, {
                        '$lookup': {
                            'from': 'jobs',
                            'localField': 'job_id',
                            'foreignField': '_id',
                            'as': 'job'
                        }
                    }, {
                        '$unwind': {
                            'path': '$job'
                        }
                    }
                ])
            ]

        except Exception as error:
            print(error)
            return {'message': "Malformed input. Check the console"}, 400

        return {
            'jobinstances': jobinstances
        }

    def post(self):
        """ Create a new job instance """

        try:
            request_data = JobInstance.parser.parse_args()
        except Exception as error:
            print(error)
            return {'message': "Malformed input. Check the console"}, 400

        try:
            with mongo.cx.start_session()as session:
                with session.start_transaction():

                    # Building the jobInstance
                    new_jobinstance = JobInstanceModel.build_jobinstance_from_request(request_data)

                    if new_jobinstance['is_approved']:
                        raise ValidationError("Job instance cannot be complete uppon creation")

                    # TODO: prevent multiple creations (cannot check on name)

                    result = mongo.db.jobinstances.insert_one(new_jobinstance)
                    new_jobinstance['_id'] = result.inserted_id

                    # Update the last_completed field on the job model
                    updated_job = JobsModel.find_by_id(new_jobinstance['job_id'])
                    updated_job['last_completed'] += 1
                    mongo.db.jobs.update({"_id": ObjectId(new_jobinstance['job_id'])}, updated_job)

                    return strip_objectid(new_jobinstance)

        except ValidationError as error:
            return {"message": error.message}, 400
