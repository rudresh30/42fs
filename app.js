const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const helmet = require('helmet');

const app = express();

app.use(helmet());

const staticpath = path.join(__dirname, '/src');
app.use(express.static(staticpath));


app.get('/', function (req, res) {
  res.render('./src/index.html');
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const connectString = 'postgres://bqupwvgf:6aKL3RRcDitWPgtojtLHGzpHmoLoDKhU@elmer.db.elephantsql.com:5432/bqupwvgf';
/*
let client = new pg.Client({ connectionString: connectString });
client.connect();

let queryobj = {
  text: 'select * from batch_master where batch_id > $1',
  values: [1]
  //rowMode:'array'
}
client.query(queryobj, (err, res) => {
  if (err) {
    console.log(err.stack);

  } else {
    res.rows.forEach((resultRow) => {
      console.log(resultRow);
    })
  }
  client.end();
});*/
//temp test for post
app.post("/save", urlencodedParser, function (req, res) {
  console.log(req.body);
})


//handle contact form post data
app.post("/submit", urlencodedParser, function (req, res) {
  let client = new pg.Client({ connectionString: connectString });
  client.connect();

  let queryobj = {
    text: `insert into inquiries values(nextval('inq_sequence'),$1,$2,$3,localtime,$4,current_date)`,
    values: [req.body.name, req.body.email, req.body.contactno, req.body.batch]
    //rowMode:'array'
  }
  client.query(queryobj, (err, res) => {
    if (err) {
      console.log(err.stack);

    } else {
      console.log("insert successful");
    }
    client.end();
  })
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000');
});
