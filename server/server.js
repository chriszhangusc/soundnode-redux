var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var axios = require('axios');
var url = require('url');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//http://localhost:3001/sc/api-v2/charts?kind=top&genre=soundcloud:genres:country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
var SC_API_V2 = 'https://api-v2.soundcloud.com/';

app.get('/sc/api-v2/charts', function(req, res) {
  var fetchUrl = url.resolve(SC_API_V2, 'charts');
  var kind = encodeURIComponent(req.query.kind);
  var genres = encodeURIComponent(req.query.genre);
  var limit = encodeURIComponent(req.query.limit);
  var offset = encodeURIComponent(req.query.offset);
  var clientId = encodeURIComponent(req.query.client_id);
  fetchUrl +=
    '?kind=' + kind +
    '&genres=' + genres +
    '&client_id=' + clientId +
    '&limit=' + limit +
    '&offset=' + offset +
    '&linked_partitioning=1';
  // console.log(fetchUrl);
  axios.get(fetchUrl).then(function(response, error) {
    // Success
    res.end(response.data);
  });
  res.end(fetchUrl);
});

app.listen(3001, function() {
  console.log('Backend Server Started at 3001');
});
//
// //Connect to mongoose database
// //Maybe we can put these code into one module?
// var config = require('./config/config.js');
// var mongoose = require('mongoose');
// var connUrl = config.mongodb.getUrl();
// mongoose.connect(connUrl);
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('Database connected!');
// });
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', routes);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
//
//
// module.exports = app;
