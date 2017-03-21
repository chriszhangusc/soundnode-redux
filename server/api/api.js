// This is the API Server that talks to SoundCloud.
import express from 'express';
import bodyParser from 'body-parser';
import v1 from './routes/v1';
import v2 from './routes/v2';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const production = process.env.NODE_ENV === 'production';
// Development port 3001
let port = 3001;
// Local production test uses port 5001
// If on heroku, use process.env.PORT
if (production) port = process.env.PORT || 5001;

// Add headers
app.use((req, res, next) => {
    var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
    var origin = req.headers.origin;

    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

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
