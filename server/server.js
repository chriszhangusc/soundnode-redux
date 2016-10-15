// API Server
// var express = require('express');
import express from 'express';
// const router = Router();
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios';
import url from 'url';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3001;

// http://localhost:3001/sc/api-v2/charts?kind=top&genre=soundcloud:genres:country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
const SC_API_V2 = 'https://api-v2.soundcloud.com/';


// Solve CORS problem: The browser (which is served by 3000) requests a different domain 3001
// app.use((req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//
//   // Pass to next layer of middleware
//   next();
// });

app.get('/sc/api-v2/charts', (req, res) => {
  let fetchUrl = url.resolve(SC_API_V2, 'charts');
  const kind = encodeURIComponent(req.query.kind);
  const genre = encodeURIComponent(req.query.genre);
  const limit = encodeURIComponent(req.query.limit);
  const offset = encodeURIComponent(req.query.offset);
  const clientId = encodeURIComponent(req.query.client_id);
  fetchUrl +=
    '?kind=' + kind +
    '&genre=' + genre +
    '&client_id=' + clientId +
    '&limit=' + limit +
    '&offset=' + offset +
    '&linked_partitioning=1';

  axios.get(fetchUrl).then((response, err) => {
    // Success write data back to browser.
    if (!err) {
      res.json(response.data);
    }
  });
});


app.listen(PORT, () => {
  console.log(`API Server Started at:${PORT}`);
});
