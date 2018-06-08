let path = require('path');
let express = require('express');

let app = express();

let staticpath = path.join(__dirname, '/src');
app.use(express.static(staticpath));

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('listening on port 3000');
})
