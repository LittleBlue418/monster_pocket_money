from flask_restful import Resource, reqparse
from pymongo.collection import ObjectId

from monster_pocket_money.models import mongo, ValidationError
from monster_pocket_money.models.jobinstance import JobInstanceModel
from monster_pocket_money.models.jobs import JobsModel


class JobInstance(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('job_id',
                        required=True,
                        type=str,
                        help='Job must be added')
    parser.add_argument('participants',
                        # [ '_id' , '_id' ]
                        action='append',
                        required=True,
                        help='Job must have participants')
    parser.add_argument('completion_date',
                        type=int,  # TODO: type=datetime
                        required=True,
                        help='Job must have a completion date')
    parser.add_argument('is_approved',
                        type=bool,
                        required=True,
                        help='Job must have an approved status')

    def get(self, jobinstance_id):
        """ Return a specific job instance """
        jobinstance = JobInstanceModel.find_by_id(jobinstance_id)

        if jobinstance is None:
            return {"message": "A job with that ID does not exist"}, 404

        return JobInstanceModel.return_as_object(jobinstance)

    def put(self, jobinstance_id):
        """ Edit a specific job instance """
        request_data = JobInstance.parser.parse_args()

        if not JobInstanceModel.find_by_id(jobinstance_id):
            return {"message": "A job instance with that ID does not exist"}, 404

        try:
            # TODO: transaction - if job approved, last completed date on job field updated
            updated_jobinstance = JobInstanceModel.build_jobinstance_from_request(request_data)
            mongo.db.jobinstances.update({"_id": ObjectId(jobinstance_id)}, updated_jobinstance)

            return JobInstanceModel.return_as_object(updated_jobinstance)

        except ValidationError as error:
            return {"message": error.message}, 400

    def delete(self, jobinstance_id):
        """ Delete a specific job instance """
        jobinstance = JobInstanceModel.find_by_id(jobinstance_id)

        if jobinstance is None:
            return {"message": "Job instance has already been deleted"}

        mongo.db.jobinstances.remove({"_id": ObjectId(jobinstance_id)})

        return {"message": "Job instance deleted"}


class JobsInstanceCollection(Resource):

    def get(self):
        """ Return all job instances """
        try:
            jobinstances = [
                JobInstanceModel.return_as_object(jobinstance)
                for jobinstance in mongo.db.jobinstances.find({'is_approved': False})
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

                    return JobInstanceModel.return_as_object(new_jobinstance)

        except ValidationError as error:
            return {"message": error.message}, 400
