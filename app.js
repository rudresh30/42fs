const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const xssFilters = require('xss-filters');
const expressValidator = require('express-validator');
const csp = require('express-csp-header');
const debug = require('debug')('app');

const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//content security policy - with nonce
const cspMiddleware = csp({
  policies: {
    'default-src': [csp.SELF],
    'img-src': [csp.NONCE, csp.SELF, `www.google-analytics.com`],
    'font-src': [`fonts.googleapis.com`, `use.fontawesome.com`, `bootstrapcdn.com`, `maxcdn.bootstrapcdn.com`, `fonts.gstatic.com`],
    'style-src': [csp.NONCE, `fonts.googleapis.com`, `use.fontawesome.com`, `bootstrapcdn.com`, `maxcdn.bootstrapcdn.com`],
    'script-src': [csp.NONCE, `jquery.com`, `cloudflare.com`, `bootstrapcdn.com`, `jsdelivr.net`, `www.google-analytics.com`, `'strict-dynamic'`, `'unsafe-inline'`],
    'object-src': [csp.NONE],
    'block-all-mixed-content': true,
    'base-uri': [csp.NONE]
  }
});



app.use(helmet());
app.use(cspMiddleware);
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

const staticpath = path.join(__dirname, 'public');
app.use(express.static(staticpath));

app.get('/', function (req, res, next) {
  try {
    res.render('index', {
      nonce: req.nonce,
      title: '42 Fullstack Academy - Learn Javascript in Ahmedabad'
    });
  }
  catch (err) {
    debug(`error in get - ${err}`)
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

  req.checkBody('batch', `Please select a valid batch`).notEmpty().isIn([1, 2, 3, 10]);

  req.getValidationResult()
    .then(function (results) {
      if (results.isEmpty() === false) {
        //results not empty means errors present
        debug(`errors present in validation`);
        var resArray = results.array();
        res.json({ result: resArray[0].msg });
        next(new Error(`validation failure - ${resArray}`));
      } else {
        //no errors - continue
        next();
      }
    })
};

//handle contact form post data
app.post("/submit", validateInput, function (req, res, next) {
  let client = new pg.Client({ connectionString: connectString });
  client.connect();
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
      debug(`error in database query - ${err}`);
      next(err);

    } else {

      res.json({ result: `Got your request, ${xssFilters.inHTMLData(qName)}! We will reach out to you as soon as possible` })
    }
    client.end();
  })
});

let port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('listening on port 8080');
});
