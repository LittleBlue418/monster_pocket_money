from flask_restful import Resource, reqparse

from monster_pocket_money.models import mongo, ValidationError
from monster_pocket_money.models.jobinstance import JobInstanceModel


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

    def get(self, job_instance_id):
        # Return a specific job instance
        pass

    def put(self, job_instance_id):
        # Edit a specific job instance
        # TODO: once job approved, last completed date on job field updated
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

            result = mongo.db.jobinstances.insert_one(new_jobinstance)
            new_jobinstance['_id'] = result.inserted_id

            # TODO: update the last_completed field on the job model

            return JobInstanceModel.return_as_object(new_jobinstance)

        except ValidationError as error:
            return {"message": error.message}, 400
