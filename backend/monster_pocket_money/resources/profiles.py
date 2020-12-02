from flask_restful import Resource, reqparse
from pymongo import DESCENDING
from pymongo.collection import ObjectId

from monster_pocket_money.models import mongo, ValidationError, strip_objectid
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
                        # Object
                        # {
                        #    'job_id': {
                        #       'job_name': 'job_name'
                        #       'number_completed_instances': 'number_completed_instances'
                        #   }
                        # }
                        action='append',
                        help='List the jobs this person has completed')
    parser.add_argument('money_owed',
                        type=float,
                        required=True,
                        help='Profile must set amount of pocket money owed')
    parser.add_argument('total_money_earned',
                        type=float,
                        required=True,
                        help='Profile must have total pocket money earned')

    def get(self, profile_id):
        """ Return a specific profile as an object """
        profile = ProfilesModel.find_by_id(profile_id)

        if profile is None:
            return {"message": "A profile with that ID does not exist"}, 404

        return strip_objectid(profile)

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

            return strip_objectid(updated_profile)

        except ValidationError as error:
            return {"message": error.message}, 400

    def delete(self, profile_id):
        """ Delete a specific profile """
        profile = ProfilesModel.find_by_id(profile_id)

        if profile is None:
            return {"message": "A profile with that ID does not exist"}

        mongo.db.profiles.remove({"_id": ObjectId(profile_id)})

        return {"message": "Profile has been deleted"}


class ProfilesCollection(Resource):

    def get(self):
        """ Return all profiles """
        try:
            profiles = [
                strip_objectid(profile)
                for profile in mongo.db.profiles.find().sort('name', DESCENDING)
            ]
        except Exception as error:
            print(error)
            return {'message': "Malformed input. Check the console"}, 400

        return {
            'profiles': profiles
        }

    def post(self):
        """ Create a new profile """
        try:
            request_data = Profile.parser.parse_args()
            print(request_data)
        except Exception as error:
            print(error)
            return {'message': "Malformed input. Check the console"}, 400

        try:
            new_profile = ProfilesModel.build_profile_from_request(request_data)

            if ProfilesModel.find_by_name(new_profile['name']):
                return {'message': 'A user with that name already exists'}, 400

            result = mongo.db.profiles.insert_one(new_profile)
            new_profile['_id'] = result.inserted_id

            return strip_objectid(new_profile)

        except ValidationError as error:
            return {'message': error.message}, 400
