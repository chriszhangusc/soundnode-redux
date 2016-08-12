var express = require('express');
// Create our app
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static('public'));

app.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
});
