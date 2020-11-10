from flask_restful import Resource, reqparse


class JobInstance(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('job',
                        type=str,  # TODO: foreign key?
                        required=True,
                        help='Job must have a name')
    parser.add_argument('participants',
                        action='append',  # List
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
        pass

    def delete(self, job_instance_id):
        # Delete a specific job instance
        pass


class JobsInstanceCollection(Resource):

    def get(self):
        # Return all job instances
        pass

    def post(self):
        # Create a new job instance
        pass
