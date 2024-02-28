import os

from starlette.config import Config

env_files = ["dev.env", "prod.env"]

config = Config()

for env_file in env_files:
    env_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".." , ".." , env_file))
    if os.path.exists(env_file_path):
        config = Config(env_file_path)
        break

# General settings
API_V1_PREFIX = config("API_V1_PREFIX", cast=str)
DEBUG = config("DEBUG", cast=bool, default=False)
PROJECT_NAME = config("PROJECT_NAME", cast=str)
VERSION = config("VERSION", cast=str, default="1.0.0")

# Scraper settings
RESOURCES_SITE_ENTRYPOINT = config("RESOURCES_SITE_ENTRYPOINT", cast=str)