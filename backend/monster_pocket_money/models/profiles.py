from monster_pocket_money.models import mongo, ValidationError
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
