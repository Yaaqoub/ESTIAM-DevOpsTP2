let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    env = require('dotenv').load(),
    logger = require('morgan');



//Exported models
let models = require("./models");


// Check Database connection
models.sequelize.authenticate().then(() => {

  //Create Database Models
  models.sequelize.sync({
    force: true
  }).then(() => {

    models.main.create({
      theAnchor: 'heavy',
      counter: 0
    });
  }).catch((err) => {
    throw new Error(err);
  });

}).catch(err => {
  console.error(err);
  process.exit(1);
});




let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */

let main = require('./routes/main');

app.use('/', main);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
