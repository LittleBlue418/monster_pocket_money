from flask_restful import Resource, reqparse
from pymongo import DESCENDING
from pymongo.collection import ObjectId

from monster_pocket_money.models import mongo, ValidationError, strip_objectid
from monster_pocket_money.models.jobs import JobsModel


class Job(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help='Job must have a name')
    parser.add_argument('description',
                        type=str,
                        required=True,
                        help='Job must have a description')
    parser.add_argument('reward',
                        type=float,
                        required=True,
                        help='Job must have a monetary reward value')
    parser.add_argument('frequency',
                        type=int,
                        required=True,
                        help='Job must have a frequency')
    parser.add_argument('start_date',
                        type=int,  # TODO: type=datetime
                        required=True,
                        help='Job must have a start date')
    parser.add_argument('last_completed',
                        type=int,  # TODO: type=datetime
                        required=True,
                        help='Job must have a date of last generation')
    parser.add_argument('postit_id',
                        type=str,
                        required=False)

    def get(self, job_id):
        """ Return a specific job """
        job = JobsModel.find_by_id(job_id)

        if job is None:
            return {"message": "A job with that ID does not exist"}, 404

        return strip_objectid(job)

    def put(self, job_id):
        """ Edit a specific job """
        request_data = Job.parser.parse_args()

        if not JobsModel.find_by_id(job_id):
            return {"message": "A job with that ID does not exist"}, 404

        try:
            # TODO: transaction - also update jobs saved in user's profiles
            # TODO: transaction - also update jobs saved in Job instances
            updated_job = JobsModel.build_job_from_request(request_data)
            mongo.db.jobs.update({"_id": ObjectId(job_id)}, updated_job)

            return strip_objectid(updated_job)

        except ValidationError as error:
            return {"message": error.message}, 400

    def delete(self, job_id):
        """ Delete a specific job """
        job = JobsModel.find_by_id(job_id)

        if job is None:
            return {"message": "A job with that ID does not exist"}

        # TODO: remove job from user profile once it has been deleted

        mongo.db.jobs.remove({"_id": ObjectId(job_id)})

        return {"message": "Job has been deleted"}


class JobsCollection(Resource):

    def get(self):
        """ Return all jobs """
        try:
            jobs = [
                strip_objectid(job)
                for job in mongo.db.jobs.find().sort('name', DESCENDING)
                # TODO: sort in name Ascending
            ]
        except Exception as error:
            print(error)
            return {'message': "Malformed input. Check the console"}, 400

        return {
            'jobs': jobs
        }

    def post(self):
        """ Add a new job to the db """
        try:
            request_data = Job.parser.parse_args()
        except Exception as error:
            print(error)
            return {'message': "Malformed input. Check the console"}, 400

        try:
            new_job = JobsModel.build_job_from_request(request_data)

            if JobsModel.find_by_name(new_job['name']):
                return {'message': 'A job with that name already exists'}, 400

            # Generate and add code for post it note design
            new_job['postit_id'] = JobsModel.generate_postit_id()

            result = mongo.db.jobs.insert_one(new_job)
            new_job['_id'] = result.inserted_id

            return strip_objectid(new_job)

        except ValidationError as error:
            return {'message': error.message}, 400
