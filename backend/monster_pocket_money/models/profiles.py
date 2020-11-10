from monster_pocket_money.models import mongo, ValidationError
from monster_pocket_money.resources.jobs import JobsModel
from pymongo.collection import ObjectId


class ProfilesModel():

    @staticmethod
    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @staticmethod
    def find_by_id(_id):
        return mongo.db.profiles.find_one({"_id": ObjectId(_id)})

    @staticmethod
    def find_by_name(name):
        return mongo.db.profiles.find_one({"name": name})

    # TODO: should I build a specif 'change password' method?

    @staticmethod
    def build_profile_from_request(request_data):

        built_profile = {
            'name': 'name',
            'password': 'password',
            'is_admin': False,
            'picture': 'picture',
            'completed_jobs': [],
            'pocket_money_owed': 0,
            'total_pocket_money_earned': 0
        }

        # Name
        built_profile['name'] = request_data.get('name', '').strip()

        if len(built_profile['name']) < 1:
            raise ValidationError('Profile must have a name!')
        if len(built_profile['name']) > 60:
            raise ValidationError(
                'Profile name cannot contain more then 60 characters!'
                )

        # Password
        built_profile['password'] = request_data.get('password', '').strip()

        if len(built_profile['password']) < 1:
            raise ValidationError('Profile must have a password!')
        if len(built_profile['password']) > 60:
            raise ValidationError(
                'Profile password cannot contain more then 60 characters!'
                )

        # Admin
        built_profile['is_admin'] = request_data.get('is_admin')

        # Picture
        built_profile['picture'] = request_data.get('picture', '').strip()

        if len(built_profile['picture']) < 1:
            raise ValidationError('Profile must have a picture!')

        # Completed Jobs
        built_profile['completed_jobs'] = request_data['completed_jobs']

        if built_profile['completed_jobs']:
            for job_object in built_profile['completed_jobs']:
                job_id = job_object['job']['_id']

                if not job_id:
                    raise ValidationError('Job needs an ID')

                job_from_db = JobsModel.find_by_id(job_id)
                if not job_from_db:
                    raise ValidationError('Job not found in database')

                job_object['job'] = {
                    '_id': job_id,
                    'name': job_from_db['name'],
                }
        else:
            pass

        # Pocket money owed
        built_profile['money_owed'] = request_data['money_owed']

        # Total pocket money earned
        built_profile['total_money_earned'] = request_data['total_money_earned']

        return built_profile
