from reduce_foodwaste.models import mongo, ValidationError


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
            'job': {},
            'participants': [],
            'creation_date': 0,
            'completion_data': 0,
            'is_approved': False,
        }

        # Job
        built_jobinstance['job'] = request_data.get('job', {})

        if not built_jobinstance['job']:
            return {"message": "Job instance must include a job model"}
        if not mongo.db.jobs.find_one({"_id": built_jobinstance['job']['_id']}):
            return {"message": "Job model not found"}

        # Participants
        built_jobinstance['participants'] = request_data.get('participants', [])

        if len(built_jobinstance['participants']) < 1:
            return {"message": "There must be at least one participant"}

        for participant in built_jobinstance['participants']:
            if not mongo.db.profiles.find_one({"_id": participant['_id']}):
                return {"message": "Profile not found"}

        # Creation Date
        built_jobinstance['creation_date'] = request_data.get('creation_date', 0)

        if built_jobinstance['creation_date'] <= 0:
            raise ValidationError('creation date must be greater than 0')

        # Completion Date
        built_jobinstance['completion_date'] = request_data.get('completion_date', 0)

        if built_jobinstance['completion_date'] <= 0:
            raise ValidationError('completion date must be greater than 0')

        # Is Approved
        built_jobinstance['is_approved'] = request_data['is_approved']

        if built_jobinstance['is_approved']:
            return {
                "message": "Job instance cannot be complete uppon creation"}

        return built_jobinstance
