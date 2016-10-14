// API Server
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var axios = require('axios');
var url = require('url');
// import url from 'url';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var PORT = 3001;

//http://localhost:3001/sc/api-v2/charts?kind=top&genre=soundcloud:genres:country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
var SC_API_V2 = 'https://api-v2.soundcloud.com/';

// Add headers
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/sc/api-v2/charts', function(req, res) {
  var fetchUrl = url.resolve(SC_API_V2, 'charts');
  var kind = encodeURIComponent(req.query.kind);
  var genre = encodeURIComponent(req.query.genre);
  var limit = encodeURIComponent(req.query.limit);
  var offset = encodeURIComponent(req.query.offset);
  var clientId = encodeURIComponent(req.query.client_id);
  fetchUrl +=
    '?kind=' + kind +
    '&genre=' + genre +
    '&client_id=' + clientId +
    '&limit=' + limit +
    '&offset=' + offset +
    '&linked_partitioning=1';

  axios.get(fetchUrl).then(function(response, error) {
    // Success
    res.json(response.data);
  });
});

app.listen(PORT, function() {
  console.log('API Server Started at: ' + PORT);
});
