// This is the production server hosting files in dist folder.
// Api server has been separated to another project called redux-music-api
// Just like in development we use webpack-dev-server.
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

const distPath = path.join(__dirname, '..', 'build');

// Here we have to match publicPath in webpack production config file.
app.use(express.static(distPath));

// Always serve the index.html page and let the client side do the heavy-lifting
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Production content server started at:${PORT}`);
});
