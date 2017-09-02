const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT || 3001;

// Add headers
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://localhost:8080',
    'https://soundnode-redux.herokuapp.com',
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

// proxy middleware options
const optionsV1 = {
  target: 'https://api.soundcloud.com',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/sc/v1': '/',
  },
};

const optionsV2 = {
  target: 'https://api-v2.soundcloud.com', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/sc/v2': '/',
  },
};

const proxyV1 = proxy(optionsV1);
const proxyV2 = proxy(optionsV2);

app.use('/sc/v1', proxyV1);
app.use('/sc/v2', proxyV2);

function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);
app.listen(port, () => {
  console.log('Server running at port:', port);
});
