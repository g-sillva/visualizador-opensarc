import atexit
import requests
import os
from fastapi import FastAPI
from api.cache import add_to_cache, get_from_cache
from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv

app = FastAPI() # Create a FastAPI instance
load_dotenv() # Load environment variables

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.get("/resources")
def get_resources():
    cached_resource = get_from_cache('resources')

    if cached_resource is None:
        fetch_resources()

    return get_from_cache('resources')

def fetch_resources():
    r = requests.get(os.getenv('SCRAPY_SERVER_URL')).json()
    items = r['items']
    add_to_cache('resources', items)

scheduler = BackgroundScheduler()
scheduler.add_job(func=fetch_resources, trigger="interval", minutes=5)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())