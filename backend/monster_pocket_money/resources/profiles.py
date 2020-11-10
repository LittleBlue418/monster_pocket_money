from flask_restful import Resource, reqparse
from pymongo.collection import ObjectId

from monster_pocket_money.models import mongo, ValidationError
from monster_pocket_money.models.profiles import ProfilesModel


class Profile(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help='Profile must have a name')
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help='Profile must have a password')
    parser.add_argument('is_admin',
                        type=bool,
                        required=True,
                        help='Profile must say whether it is an admin account')
    parser.add_argument('picture',
                        type=str,
                        required=True,
                        help='Profile must have a picture selected')
    parser.add_argument('completed_jobs',
                        # List of Objects
                        # [
                        #   {0: Object
                        #      job: {job object}
                        #      number_completed_instances: 1
                        #   },
                        # ]
                        action='append',
                        required=True,
                        # TODO: should this be required? It will start empty
                        help='List the jobs this person has ccompleted')
    parser.add_argument('money_owed',
                        type=float,
                        required=True,
                        help='Profile must set amount of pocket money owed')
    parser.add_argument('total_money_earned',
                        type=int,
                        required=True,
                        help='Profile must have total pocket money earned')

    def get(self, profile_id):
        """ Return a specific profile as an object """
        profile = ProfilesModel.find_by_id()

        if profile is None:
            return {"message": "A profile with that ID does not exist"}, 404

        return ProfilesModel.return_as_object(profile)

    def put(self, profile_id):
        """ Edit a specific profile """
        request_data = Profile.parser.parse_args()

        if not ProfilesModel.find_by_id(profile_id):
            return {"message": "A profile with that ID does not exist"}, 404

        try:
            updated_profile = ProfilesModel.build_profile_from_request(
                request_data)

            mongo.db.profiles.update(
                {"_id": ObjectId(profile_id)}, updated_profile)
            updated_profile['_id'] = profile_id

            return ProfilesModel.return_as_object(updated_profile)

        except ValidationError as error:
            return {"message": error.message}, 400

    def delete(self, profile_id):
        # Delete a specific profile
        pass


class ProfilesCollection(Resource):

    def get(self):
        # Return all profiles
        pass

    def post(self):
        # Create a new instance of type profile
        pass
