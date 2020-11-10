from flask_pymongo import PyMongo
mongo = PyMongo()

class ValidationError(Exception):
    def __init__(self, message):
        self.message = message
