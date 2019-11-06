#!/bin/bash

cd  "$(dirname "$0")/.."

[ -e .env ] && rm .env  # remove the .env file if it exists so we pickup any changes

FLASK_APP="homography.flask_server:app"

pipenv run gunicorn -c config/gunicorn.cfg ${FLASK_APP}