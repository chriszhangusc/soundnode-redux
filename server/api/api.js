// This is the API Server that talks to SoundCloud.
import express from 'express';
import bodyParser from 'body-parser';
import v1 from './routes/v1';
import v2 from './routes/v2';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const production = process.env.NODE_ENV === 'production';
const port = production ? process.env.PORT : 3001;

// Add headers
app.use((req, res, next) => {
   // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Simple logger
function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);

app.use('/sc/api-v1', v1);
app.use('/sc/api-v2', v2);

app.listen(port, () => {
  console.log(`API Server Started at:${port}`);
});
