from flask_pymongo import PyMongo, ObjectId
mongo = PyMongo()


class ValidationError(Exception):
    def __init__(self, message):
        self.message = message


def strip_objectid(data):
    if isinstance(data, ObjectId):
        return str(data)
    if isinstance(data, list):
        return [strip_objectid(item) for item in data]
    if isinstance(data, dict):
        return {key: strip_objectid(value) for key, value in data.items()}
    return data
