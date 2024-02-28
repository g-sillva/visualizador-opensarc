from fastapi import FastAPI

from core import config

app = FastAPI(title=config.PROJECT_NAME, 
              openapi_url=f"{config.API_V1_PREFIX}/openapi.json", 
              version=config.VERSION, 
              debug=config.DEBUG)

@app.get("/", tags=["Health Check"])
async def health_check():
    return {"name": config.PROJECT_NAME, 
            "documentation": "/docs", 
            "version": config.VERSION}