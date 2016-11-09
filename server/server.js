// This is the production content server, in development we use webpack-dev-server
const express = require('express');
const path = require('path');
const fallback = require('express-history-api-fallback');

// Create our app
const app = express();

const production = process.env.NODE_ENV === 'production';
const port = production ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, '../public');

app.use('/', express.static(publicPath));

app.use(fallback('index.html', { root: publicPath }));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
