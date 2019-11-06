FROM jjanzic/docker-python3-opencv:opencv-4.0.1

RUN mkdir /install
WORKDIR /install
COPY requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

WORKDIR /app
COPY ./homography /app/homography
COPY ./config /app/config

EXPOSE 8090
CMD ["gunicorn", "-c", "config/gunicorn.cfg", "homography.flask_server:app"]