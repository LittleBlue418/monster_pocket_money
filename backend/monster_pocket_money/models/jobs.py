from monster_pocket_money.models import mongo, ValidationError
from pymongo.collection import ObjectId
import random


class JobsModel():
    # Numbers for asigning postit notes
    max = 8
    min = 1

    @staticmethod
    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @staticmethod
    def find_by_id(_id):
        return mongo.db.jobs.find_one({"_id": ObjectId(_id)})

    @staticmethod
    def find_by_name(name):
        return mongo.db.jobs.find_one({"name": name})

    @classmethod
    def generate_postit_id(cls):
        return random.randint(cls.min, cls.max)

    @staticmethod
    def build_job_from_request(request_data):

        built_job = {
            'name': 'name',
            'description': 'description',
            'reward': 0,
            'frequency': 0,
            'start_date': 0,
            'last_completed': 0
        }

        # Name
        built_job['name'] = request_data.get('name', '').strip()

        if len(built_job['name']) < 1:
            raise ValidationError('Job must have a name!')
        if len(built_job['name']) > 60:
            raise ValidationError(
                'Job name cannot contain more then 60 characters!'
                )

        # Description
        built_job['description'] = request_data.get('description', '').strip()

        if len(built_job['description']) < 1:
            raise ValidationError('Job must have a description!')
        if len(built_job['description']) > 300:
            raise ValidationError(
                'Job description cannot contain more then 300 characters!'
                )

        # Reward
        built_job['reward'] = request_data.get('reward', 0)

        if built_job['reward'] <= 0:
            raise ValidationError('reward must be greater than 0')

        # Frequency
        built_job['frequency'] = request_data.get('frequency', 0)

        if built_job['frequency'] <= 0:
            raise ValidationError('frequency must be greater than 0')

        # Start date
        built_job['start_date'] = request_data.get('start_date', 0)

        if built_job['start_date'] <= 0:
            raise ValidationError('start date must be greater than 0')

        # Last generated instance
        built_job['last_completed'] = request_data.get('last_completed', 0)

        if built_job['last_completed'] <= 0:
            raise ValidationError('last generated instance must be greater than 0')

        # Postit ID
        if request_data['postit_id']:
            built_job['postit_id'] = request_data['postit_id']

        return built_job
