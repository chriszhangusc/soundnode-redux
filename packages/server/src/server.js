require('dotenv').config();

const express = require('express');
const cors = require('cors');
const configureProxy = require('./config/proxy');
const configureLogger = require('./config/logger');
const configureGraphQL = require('./config/graphql');

const app = express();

const port = process.env.PORT || 4444;

app.use(cors());
configureProxy(app);
configureLogger(app);
configureGraphQL(app);

app.listen(port, () => {
  console.log('Server running at port:', port);
});
