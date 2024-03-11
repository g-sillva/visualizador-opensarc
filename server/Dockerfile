FROM python:3.12.2-alpine

WORKDIR /app

COPY . /app

RUN apk update && apk add python3-dev \
    gcc \
    libc-dev

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "api.main:app", "--reload", "--port=8000", "--host=0.0.0.0"]