// This is the production content server, in development we use webpack-dev-server
const express = require('express');
const path = require('path');

// Create our app
const app = express();

const production = process.env.NODE_ENV === 'production';
const port = production ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, '../public');

app.use('/', express.static(publicPath));

// This won't work because for now we are using client side routing
// app.get('*', function(req, res) {
//   console.log(req);
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
