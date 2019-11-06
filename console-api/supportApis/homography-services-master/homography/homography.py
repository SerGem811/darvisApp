import cv2
import numpy as np

def load_homographies(data):
    xy = np.array([(item["x"],item["y"]) for item in data["points"]])
    latlong = np.array([(item["lat"],item["long"]) for item in data["points"]])
    print(latlong)
    if len(xy) < 4 or len(latlong) < 4:
        return None
    h, __ = cv2.findHomography(xy, latlong)
    # print("\thomographies\n{}".format(H))
    a, b, c, d, e, f, g, h, __ = h.flatten()

    return {
        "homography_points":{
            'a': a,
            'b': b,
            'c': c,
            'd': d,
            'e': e,
            'f': f,
            'g': g,
            'h': h
        }
    }

def apply_homography_to_points(data):
    processed_points = []
    for point in data["points"]:
        processed_points.append(apply_homography(data["homography_points"], point))
    return processed_points


def apply_homography(homography, point):
    print("applying_homography")
    h = homography
    print ("H: %s" % h)
    x = point["x"]
    print ("x: %s" % x)
    y = point["y"]
    print ("y: %s" % y)

    latitude = (h['a'] * x + h['b'] * y + h['c']) / (h['g'] * x + h['h'] * y + 1)
    longitude = (h['d'] * x + h['e'] * y + h['f']) / (h['g'] * x + h['h'] * y + 1)
    latitude = round(latitude, 6)
    longitude = round(longitude, 6)
    return {"lat":latitude,"long":longitude}
