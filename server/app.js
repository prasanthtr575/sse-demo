var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var db = require('./db/mongodb');

//var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();
app.use(cors());
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//application.use("/public", express.static('../../client/ng1'));
app.use(express.static('../client'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

/*
// Connect to Mongo on start
db.connect('mongodb://localhost:27017/sse', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    console.log('Connected to Mongo, mongodb://localhost:27017/sse ...');
  }
});
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
