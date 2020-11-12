from flask_restful import Resource, reqparse

from monster_pocket_money.models import mongo, ValidationError
from monster_pocket_money.models.jobinstance import JobInstanceModel


class JobInstance(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('job',
                        # {
                        #   '_id' : ObjectId("")
                        #   'name': 'name',
                        #   'description': 'description',
                        #   'reward': 0,
                        #   'frequency': 0,
                        #   'start_date': 0,
                        #   'last_generated_instance': 0
                        # }
                        required=True,
                        help='Job must be added')
    parser.add_argument('participants',
                        # [
                        #   {
                        #       '_id' : ObjectId(""),
                        #       'name': 'name',
                        #   },
                        # ]
                        action='append',  # List
                        required=True,
                        help='Job must have participants')
    parser.add_argument('creation_date',
                        type=int,  # TODO: type=datetime
                        required=True,
                        help='Job must have a completion date')
    parser.add_argument('completion_date',
                        type=int,  # TODO: type=datetime
                        required=True,
                        help='Job must have a completion date')
    parser.add_argument('is_approved',
                        type=bool,
                        required=True,
                        help='Job must have an approved status')

    def get(self, job_instance_id):
        # Return a specific job instance
        pass

    def put(self, job_instance_id):
        # Edit a specific job instance
        pass

    def delete(self, job_instance_id):
        # Delete a specific job instance
        pass


class JobsInstanceCollection(Resource):

    def get(self):
        # Return all job instances
        pass

    def post(self):
        """ Create a new job instance """

        try:
            request_data = JobInstance.parser.parse_args()
        except Exception as error:
            print(error)
            return {'message': "Malformed input. Check the console"}, 400

        try:
            new_jobinstance = JobInstanceModel.build_jobinstance_from_request(request_data)

            # TODO: prevent multiple creations (cannot check on name)

            result = mongo.db.jobs.insert_one(new_jobinstance)
            new_jobinstance['_id'] = result.inserted_id

            return JobInstanceModel.return_as_object(new_jobinstance)

        except ValidationError as error:
            return {"message": error.message}, 400
