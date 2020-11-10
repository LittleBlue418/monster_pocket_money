from monster_pocket_money.models import mongo
from pymongo.collection import ObjectId


class JobsModel():

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
