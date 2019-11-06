# import flask
import requests

from PIL import Image
from io import BytesIO

from flask import Flask,request, jsonify, send_file
from flask_cors import CORS

import numpy as np
import cv2

import time
import logging
import json
logging.getLogger().setLevel(logging.INFO)

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

def process_image(img):
    img =cv2.resize(img, (1280,720), interpolation = cv2.INTER_AREA)
    return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

def getFrame(rtsp_stream):
    print("Getting image ....")
    cap = cv2.VideoCapture(rtsp_stream)
    if cap.isOpened():
        ret, img = cap.read()
        if ret:
            cap.release()
            return process_image(img)
    return process_image(cv2.imread('missing_img.jpg'))

def nd_array_to_binary(img):
    img = Image.fromarray(img, 'RGB')
    output = BytesIO()
    img.save(output, format='JPEG', quality=50)
    return output.getvalue()

def make_response(image_binary,frame_name):
    return send_file(
        BytesIO(image_binary),
        mimetype='image/jpeg',
        as_attachment=True,
        attachment_filename=frame_name)

@app.route('/api/get_frame', methods=['GET','POST'])
def get_image():
    if request.data:
        payload = json.loads(request.data)
        if "stream" in payload:
            url= f'/data/{payload["stream"]}'
            img = getFrame(url)
            logging.info(f'Image shape : {img.shape}')
            if not img.shape[0]:
                return "Error: No image found in the stream"

            image_binary = nd_array_to_binary(img)

            try:
                response = make_response(image_binary,"image.jpeg")
                response.headers.set('Content-Type', 'image/jpeg')
                response.headers.set('Content-Disposition', 'attachment', filename="image.jpeg")
                return response
            except Exception as e:
                return "Can not Process your Requested: Try again {}".format(e)
    else:
        return "Error: No stream endpoint found in the request"

app.run(host='0.0.0.0',threaded=True)
