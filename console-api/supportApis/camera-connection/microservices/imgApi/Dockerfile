FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
RUN pip install --upgrade pip
RUN pip install opencv-python Pillow email-validator

WORKDIR /app

COPY imgApi/app/ /app

