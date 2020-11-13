from monster_pocket_money.models import mongo, ValidationError
from monster_pocket_money.models.jobs import JobsModel
from monster_pocket_money.models.profiles import ProfilesModel

class JobInstanceModel():

    @staticmethod
    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @staticmethod
    def find_by_id( _id):
        return mongo.db.jobinstances.find_one({"_id": ObjectId(_id)})

    @staticmethod
    def build_jobinstance_from_request(request_data):
        built_jobinstance = {
            'job_id': {},
            'participants': [],
            'completion_date': 0,
            'is_approved': False,
        }

        # Job
        built_jobinstance['job_id'] = request_data.get('job_id', '')

        if not built_jobinstance['job_id']:
            raise ValidationError("Job instance must include a job model")
        if not JobsModel.find_by_id(built_jobinstance['job_id']):
            raise ValidationError("Job model not found")

        # Participants
        built_jobinstance['participants'] = request_data.get('participants', [])

        if len(built_jobinstance['participants']) < 1:
            raise ValidationError("There must be at least one participant")

        print(built_jobinstance)
        for participant_id in built_jobinstance['participants']:
            if not ProfilesModel.find_by_id(participant_id):
                raise ValidationError("Profile not found")

        # Completion Date
        built_jobinstance['completion_date'] = request_data.get('completion_date', 0)

        if built_jobinstance['completion_date'] <= 0:
            raise ValidationError('completion date must be greater than 0')

        # Is Approved
        built_jobinstance['is_approved'] = request_data['is_approved']

        if built_jobinstance['is_approved']:
            raise ValidationError("Job instance cannot be complete uppon creation")

        return built_jobinstance
