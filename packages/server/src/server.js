const express = require('express');
const cors = require('cors');

const configureProxy = require('./config/proxy');
const configureLogger = require('./config/logger');

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
configureProxy(app);
configureLogger(app);

app.listen(port, () => {
  console.log('Server running at port:', port);
});
