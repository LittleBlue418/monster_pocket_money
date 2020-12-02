import os

from dotenv import load_dotenv
from flask import Flask

from monster_pocket_money.error_propagating_api import ErrorPropagatingApi
from monster_pocket_money.models import mongo
from monster_pocket_money.resources.profiles import Profile, ProfilesCollection
from monster_pocket_money.resources.jobs import JobsCollection, Job
from monster_pocket_money.resources.jobinstances import JobInstance, JobInstancesCollection

load_dotenv()

app = Flask(__name__)

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

mongo.init_app(app)
api = ErrorPropagatingApi(app)

api.add_resource(ProfilesCollection, '/api/profiles')
api.add_resource(Profile, '/api/profiles/<profile_id>')
api.add_resource(JobsCollection, '/api/jobs')
api.add_resource(Job, '/api/jobs/<job_id>')
api.add_resource(JobInstancesCollection, '/api/jobinstances')
api.add_resource(JobInstance, '/api/jobinstances/<jobinstance_id>')


if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )
