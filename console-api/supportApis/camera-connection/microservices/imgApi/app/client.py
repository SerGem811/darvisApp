import requests
import json
import base64
import numpy as np
import cv2
payload = {"username":"root","password":"123", "url": "/data/camera_35.mp4"}
URL = 'http://127.0.0.1:8888/api/getSingleFrame'
response = requests.post(URL, data=json.dumps(payload))
resp = json.loads(response.text)
if len(resp) < 50:
    print(resp)
try:
    nparr = np.frombuffer(base64.b64decode(resp), np.uint8)

    img= cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    cv2.imshow('image',img)
    cv2.waitKey(0)
except Exception as e:
    pass
