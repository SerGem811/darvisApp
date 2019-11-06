
var request = require('request');

var options = {
  uri: 'http://127.0.0.1:8888/api/getSingleFrame',
  method: 'POST',
  json: {
    "username":"root","password":"123", "url": "/data/camera_35.mp4"
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the shortened url.
  }
});
