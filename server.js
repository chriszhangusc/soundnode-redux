// This is the production server hosting files in dist folder.
// This will not be running with webpack-dev-server!
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

// Simple logger
function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);

app.listen(PORT, () => {
  console.log(`API Server Started at:${PORT}`);
});
