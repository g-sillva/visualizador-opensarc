import redis
import json
from datetime import datetime
import os

REDIS_HOST = os.getenv("REDIS_HOST")

r = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)

def add_to_cache(key, value):
    data_to_store = {'value': value, 'timestamp': datetime.now().isoformat()}
    serialized_data = json.dumps(data_to_store)
    r.set(key, serialized_data)

def get_from_cache(key):
    serialized_data = r.get(key)
    if serialized_data:
        data = json.loads(serialized_data)
        return data
    else:
        return None
