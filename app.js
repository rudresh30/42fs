var path = require('path');
var express = require('express');

var app = express();

var staticpath = path.join(__dirname, '/src');
app.use(express.static(staticpath));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('listening on port 3000');
})
