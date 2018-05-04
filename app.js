var path = require('path');
var express = require('express');

var app = express();

var staticpath = path.join(__dirname,'/src');
app.use(express.static(staticpath));

app.listen(3000,function(){
  console.log('listening on port 3000');
})
