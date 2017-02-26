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

// Always serve the index.html page and let the client side handle the routing
app.use(function (req, res) {
    // console.log('redirecting to index.html')
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API Server Started at:${PORT}`);
});
