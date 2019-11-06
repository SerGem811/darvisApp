# homography-service

The following endpoints are exposed in this service.
- **/api/v1/get_homographyMatrics** (POST)
This endpoint returns a homography matrix from 2x4 points on an image and its geo coordinates (lattitute and Longitute). 
Details are specified in the [Swagger Yaml file](https://github.com/HashplayInc/homography-services/blob/master/swagger-yaml-client-generated/swagger.yaml)

- **/api/v1/get_transformPoints** (POST)
This will return the geo coordinates (lat, longs) from the homography matrix and a point (x,y). 
Details are specified in the [Swagger Yaml file](https://github.com/HashplayInc/homography-services/blob/master/swagger-yaml-client-generated/swagger.yaml)


To run the service, you need to build and run the docker images by running the following commands.

### Local Builds
This service now uses `pipenv`, so all dependency changes must go in the **Pipfile**.  The corresponding
**Pipfie.lock** (via `pipenv install`), and **requirements.txt** (via `pipenv lock -r > requirements.txt`) must
be in the change set

To build a docker image:
```bash
docker build -t hashplay/homography-service .
```
### Run

#### Using pipenv
```bash
./scripts/start_gunicorn.sh 
```

#### Using docker
```bash
docker run -p 8090:8090 hashplay/homography-service
```
The application uses the port 8090 of the local machine (via gunicorn), if you want to change it to any other port you can do it with

```bash
docker run -p <your-port>:8090 hashplay/homography-service
```

In case you want the change the port inside docker you can edit the `config/gunicorn.cfg` file 

