// TODO: Test the middleware way of setting up webpack-dev-server

// This is the production server hosting files in dist folder.
// Api server has been separated to another project called redux-music-api
// Just like in development we use webpack-dev-server.
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.dev.config');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(PORT, () => {
  console.log(`Production content server started at:${PORT}`);
});
