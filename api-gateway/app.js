/**
 * @title           app.js
 * @author          Nathaniel Liebhart
 * @date            October 28, 2019
 * @description     This is the main entry point for the express server
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiCatalog = require('./routes/api-catalog');

var app = express();

// MongoDB setup
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/**
 * Database connection
 */
mongoose
  .connect('mongodb://admin:admin01@ds137498.mlab.com:37498/api-gateway', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connection successful'))
  .catch(err => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', indexRouter);
app.use('/api', apiCatalog);

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
