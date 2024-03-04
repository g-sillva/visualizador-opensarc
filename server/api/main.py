import os
import atexit
import requests
from dotenv import load_dotenv

#from apscheduler.schedulers.background import BackgroundScheduler

from flask import Flask
from flask_restful import Resource, Api

load_dotenv()
app = Flask(__name__)
api = Api(app)

class Resources(Resource):
    def get(self):
        r = requests.get(os.getenv('SCRAPY_SERVER_URL')).json()
        items = r['items']
        return items

api.add_resource(Resources, '/resources')

# scheduler = BackgroundScheduler()
# scheduler.add_job(func=job, trigger="interval", seconds=10)
# scheduler.start()

if __name__ == '__main__':
    app.run(debug=True)

# Shut down the scheduler when exiting the app
# atexit.register(lambda: scheduler.shutdown())