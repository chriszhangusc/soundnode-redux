let express = require('express');
// Create our app
let app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  // Because open weather map api only work on http not https, we have redirect all https
  // to http request
  if (req.header['x-forwarded-proto'] === 'http') {
    next();
  } else {
    res.redirect('http://' + req.hostname + req.url);
  }
});

app.use(express.static('public'));

app.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
});
