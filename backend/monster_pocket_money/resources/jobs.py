from flask_restful import Resource, reqparse
from pymongo import DESCENDING

from monster_pocket_money.models import mongo, ValidationError
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
                        type=int,  # TODO: type=decimal
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
    parser.add_argument('last_generated_instance',
                        type=int,  # TODO: type=datetime
                        required=True,
                        help='Job must have a date of last generation')

    def get(self, job_id):
        """ Return a specific job """
        job = JobsModel.find_by_id(job_id)

        if job is None:
            return {"message": "A job with that IDD does not exist"}, 404

        return JobsModel.return_as_object(job)

    def put(self, job_id):
        # Edit a specific job
        pass

    def delete(self, job_id):
        # Delete a specific job
        pass


class JobsCollection(Resource):

    def get(self):
        """ Return all jobs """
        print('here')
        try:
            jobs = [
                JobsModel.return_as_object(job)
                for job in mongo.db.jobs.find().sort('name', DESCENDING)
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

            result = mongo.db.jobs.insert_one(new_job)
            new_job['_id'] = result.inserted_id

            return JobsModel.return_as_object(new_job)

        except ValidationError as error:
            return {'message': error.message}, 400
