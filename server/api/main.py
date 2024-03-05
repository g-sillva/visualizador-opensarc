import os
import atexit
import requests
from dotenv import load_dotenv
from cache import add_to_cache, get_from_cache
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask
from flask_restful import Resource, Api
from datetime import datetime, timedelta

load_dotenv()
app = Flask(__name__)
api = Api(app)

class Resources(Resource):
    def get(self):
        cached_resource = get_from_cache('resources')

        if cached_resource is None:
            fetch_resources()

        return get_from_cache('resources')

api.add_resource(Resources, '/resources')

def fetch_resources():
    print('Fetching resources...')
    r = requests.get(os.getenv('SCRAPY_SERVER_URL')).json()
    items = r['items']
    add_to_cache('resources', items)

scheduler = BackgroundScheduler()
scheduler.add_job(func=fetch_resources, trigger="interval", minutes=5)
scheduler.start()

if __name__ == '__main__':
    app.run(debug=True)

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())