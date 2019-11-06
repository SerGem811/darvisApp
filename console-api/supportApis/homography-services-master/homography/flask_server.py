import json
import sys
from flask_cors import CORS
from flask import Flask, request, jsonify
from .homography import apply_homography_to_points, apply_homography, load_homographies
from .invalid_usage import InvalidUsage

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/api/v1/get_transformPoints', methods=['POST'])
def get_transform_points():
    if request.data:
        try:
            payload = request.get_json()
            if len(payload.items()) < 2:
                raise InvalidUsage("The body should have points and homography Points")
            if 'homography_points' in payload and 'points' in payload:
                homography = apply_homography_to_points(payload)
                return jsonify(homography)
            else:
                print("No homography applied, missing 'homography_points' and 'points' in request, returning the received payload")
        except TypeError as type_err:
            print ("Type Error")
            print (type_err)
            raise InvalidUsage("invalid request: %s" % type_err)
        # except:
        #     print ("General Exception")
        #     e = sys.exc_info()[0]
        #     raise InvalidUsage("invalid request: %s" % e)
    else:
        raise InvalidUsage("invalid request: Nothing is specified in body, expected a json object with a Points object")

    return jsonify(payload)


@app.route('/api/v1/get_transformPoint', methods=['POST'])
def get_transform_point():
    if request.data:
        try:
            payload = request.get_json()
            if len(payload.items()) < 2:
                raise InvalidUsage("The body should have points and homography Points")
            if 'homography_points' in payload and 'point' in payload:
                homography = apply_homography(payload["homography_points"], payload["point"])
                return jsonify(homography)
            else:
                print("No homography applied, missing 'homography_points' and 'point' in request, returning the received payload")
        except TypeError as type_err:
            print ("Type Error")
            print (type_err)
            raise InvalidUsage("invalid request: %s" % type_err)
        # except:
        #     print ("General Exception")
        #     e = sys.exc_info()[0]
        #     raise InvalidUsage("invalid request: %s" % e)
    else:
        raise InvalidUsage("invalid request: Nothing is specified in body, expected a json object with a Points object")

    return jsonify(payload)


@app.route('/api/v1/get_homographyMatrics', methods=['POST'])
def get_homography_matrics():

    if request.data:
        try:
            payload = request.get_json()
            if len(payload.items()) < 1:
                raise InvalidUsage("The body should have points and cameras")
            if 'points' in payload:
                homography = load_homographies(payload)
                if not homography:
                    raise InvalidUsage("homography returns none, check your param's format")
                return jsonify(homography)
            else:
                print("No homographies loaded, missing 'points' in request, returning the received payload")
        except TypeError as type_err:
            print ("Type Error")
            print (type_err)
            raise InvalidUsage("invalid request: %s" % type_err)
        except:
            print ("General Exception")
            e = sys.exc_info()[0]
            raise InvalidUsage("invalid request: %s" % e)
    else:
        raise InvalidUsage("invalid request: Nothing is specified in body, expected a json object with a HomographyMatric and points objects")

    return json.dumps(payload, separators=(',',':'))


@app.route('/v1/health-check', methods=['GET'])
def health_check():
    return '{ "status": "OK" }'


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0',threaded=True)

