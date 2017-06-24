// Proxy server for SoundCloud API V2 because of CORS
const express = require('express');
const request = require('request');

const SC_V2_HOST = 'https://api-v2.soundcloud.com';

const app = express();

// Add headers
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://localhost:8080',
    'https://redux-music.herokuapp.com',
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Simple logger
function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);

app.use('/', (req, res) => {
  const url = SC_V2_HOST + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3001);
