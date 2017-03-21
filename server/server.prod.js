// This is the production server hosting files in dist folder.
// Just like in development we use webpack-dev-server.
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var PORT = process.env.PORT || 3000;

var distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

// Simple logger
function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(logger);

// Always serve the index.html page and let the client side handle the routing
app.use(function (req, res) {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Production content server started at:${PORT}`);
});
