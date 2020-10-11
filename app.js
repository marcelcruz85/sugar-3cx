var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var CDR = require('./cdr');
var Cdr = new CDR();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var net = require('net');
var port = 7777;

var app = express();

//TCP Server for 3cx PBX
const server = new net.Server();
server.listen(port, function() {
    console.log('Server listening for connection requests on socket localhost: ' + port);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');
  
    socket.on('data', function(chunk) {
        Cdr.cdr = chunk.toString().split(',');
        console.log('Data received from client: ' + JSON.stringify(Cdr.toJson()) );
    });

    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
