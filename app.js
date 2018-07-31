const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const helmet = require('helmet');
const xssFilters = require('xss-filters');
const expressValidator = require('express-validator');

const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());


const staticpath = path.join(__dirname, 'public');
app.use(express.static(staticpath));

app.get('/', function (req, res, next) {
  try {
    res.render('index');
  }
  catch (err) {
    next(err);
  }
});

const connectString = 'postgres://bqupwvgf:6aKL3RRcDitWPgtojtLHGzpHmoLoDKhU@elmer.db.elephantsql.com:5432/bqupwvgf';

//middleware validate function. Return JSON if validation fails. Otherwise call next()
function validateInput(req, res, next) {
  var qName = req.body.name;
  var qEmail = req.body.email;
  var qContactno = req.body.contactno;
  var qBatch = req.body.batch;

  req.checkBody('name', `Please specify your name`).notEmpty();
  req.checkBody('name', `Name should only have letters[a-z..A-Z]`).isAlpha();
  req.checkBody('name', `Name should have min: 2 and max: 30 letters`).isLength({ min: 2, max: 30 });

  req.checkBody('email', `please specify your email id`).notEmpty();
  req.checkBody('email', `please provide a valid email`).isEmail();

  req.checkBody('contactno', `Please provide a valid phone number`).isLength({ min: 8, max: 18 }).isNumeric();

  req.checkBody('batch', `Please select a valid batch`).notEmpty().isIn([1, 2, 3]);

  req.getValidationResult()
    .then(function (results) {
      if (results.isEmpty() === false) {
        //results not empty means errors present
        console.log('errors present');
        var resArray = results.array();
        res.json({ result: resArray[0].msg });
        next(new Error('validation failure - ${resArray}'));
      } else {
        //no errors - continue
        console.log('in success ');
        next();
      }
    })
};

//handle contact form post data
app.post("/submit", validateInput, function (req, res, next) {
  let client = new pg.Client({ connectionString: connectString });
  client.connect();
  console.log(req.body);
  var qName = req.body.name;
  var qEmail = req.body.email;
  var qContactno = req.body.contactno;
  var qBatch = req.body.batch;
  let queryobj = {
    text: `insert into inquiries values(nextval('inq_sequence'),$1,$2,$3,localtime,$4,current_date)`,
    values: [qName, qEmail, qContactno, qBatch]
    //rowMode:'array'
  }
  client.query(queryobj, (err, response) => {
    if (err) {
      res.json({ result: `Oops! Something went wrong. Please try again.` });
      console.log(err);
      next(err);

    } else {

      res.json({ result: `Got your request, ${xssFilters.inHTMLData(qName)}! We will reach out to you as soon as possible` })
    }
    client.end();
  })
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000');
});
