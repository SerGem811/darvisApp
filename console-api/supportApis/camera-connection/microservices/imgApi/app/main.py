from fastapi import FastAPI
from pydantic import BaseModel
import cv2
import numpy as np
import base64
from PIL import Image

import logging
logging.getLogger().setLevel(logging.INFO)

from starlette.middleware.cors import CORSMiddleware

class Item(BaseModel):
    url: str
    username: str
    password: str

app = FastAPI(title='Image API', version='0.1')
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

async def process_image(img):
    return cv2.resize(img, (1280,720), interpolation = cv2.INTER_AREA)


async def getFrame(rtsp_stream):
    print("Getting image ....")
    cap = cv2.VideoCapture(rtsp_stream)
    if cap.isOpened():
        ret, img = cap.read()
        if ret:
            cap.release()
            return await process_image(img)
    return
    # return await process_image(cv2.imread('missing_img.jpg'))


@app.post("/api/getSingleFrame")
async def getSingleFrame(item: Item):
    logging.info(f'Payload > {item}')
    stream = item.url

    img = await getFrame(stream)
    if img is None:
        return "Could not get image"
    _, img_encoded = cv2.imencode('.jpg', img)
    img_bytes = base64.b64encode(img_encoded).decode('utf-8')

    return img_bytes

