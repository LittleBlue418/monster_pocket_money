from flask_restful import Resource, reqparse

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
    parser.add_argument('number_completed_jobs',
                        # Dictionary {job name : number of times completed}
                        action='append',
                        # TODO: is it append for a dictionary?
                        required=True,
                        # TODO: should this be required?
                        help='List the jobs this person has ccompleted')
    parser.add_argument('pocket_money_owed',
                        type=int,
                        # TODO: needs positive and negative (int?)
                        required=True,
                        help='Profile must set amount of pocket money owed')
    parser.add_argument('total_pocket_money_earned',
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
        # Edit a specific profile
        pass

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
