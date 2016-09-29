var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;


var app = express();

var Question = require('./Models/question.js');
var QuestionAssigned = require('./Models/questionAssigned.js');
var Reference = require('./Models/reference.js');
var User = require('./Models/userInfo.js');


var uristring ='mongodb://localhost/fresh';
var mongoOptions = { db: { safe: true } };

// Connect to Database
mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: remote' + uristring + '. ' + err);
    } else {
        console.log ('Successfully connected to: remote' + uristring);
    }
});

// Requiring Routes
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var getQuestion = require('./routes/getQuestion');
var addQuestion = require('./routes/addQuestion');
var getAllQuestion = require('./routes/getAllQuestion');
var removeQuestion = require('./routes/removeQuestion');
var renderLogin = require('./routes/renderLogin');
var register = require('./routes/register');
//var renderHomePage = require ('./routes/renderHomePage')


// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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


//  Registers the User and redirect you to login page.


// This will generate a referance number and returns it .
app.get('/generateReference', function(req, res){
  var newReference = new Reference({
    state : true
  });
  console.log("req received ")
  newReference.save(function(err) { 
    if(!err) {
      res.send({id:newReference._id});
    }
  });
});


app.post('/register', register);

app.get('/', index);

app.get('/login', renderLogin);

app.post('/login', login);

app.post('/getQuestion', getQuestion);

app.post('/addQuestion', addQuestion);

app.get('/getAllQuestion', getAllQuestion);

app.post('/removeQuestion', removeQuestion);




app.listen("8080", function(){
  console.log("server listening at port 8080");
});

module.exports = app;
