from flask_restful import Resource, reqparse


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
        # Return a specific job
        pass

    def put(self, job_id):
        # Edit a specific job
        pass

    def delete(self, job_id):
        # Delete a specific job
        pass


class JobsCollection(Resource):

    def get(self):
        # Return all jobs
        pass

    def post(self):
        # Create a new instance of type job
        pass
