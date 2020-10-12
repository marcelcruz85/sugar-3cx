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
        console.log('Json: ' + JSON.stringify(Cdr.toJson(), null, "    ") );
        // var test = Cdr.createCallLog();
        // console.log(test);

        var axios = require('axios');
var data = JSON.stringify({"duration":"00:00:24","timeStart":"2020-10-11T20:39:13.000Z","timeAnswered":"2020-10-11T20:39:16.000Z","timeEnd":"2020-10-11T20:39:41.000Z","fromNo":"Ext.141","toNo":"Ext.314","fromType":"Extension","toType":"Extension","finalType":"ConfPlace","reasonTerminated":"TerminatedBySrc","historyId":"3268379","callId":"00000175196381E2_549589","dialNo":"314","finalNumber":"Ext.990","chain":"Chain: Ext.141;Ext.314;Ext.990;","missedQueueCalls":"","fromDn":"141","toDn":"314","reasonChanged":"ReplacedSrc","finalDn":"990","billRate":"","billCost":"","billName":"","fromDispname":"Marcel Cruz","toDispname":"Mariana Tamborrel","finalDispname":"","billCode":"\r\n"});

var config = {
  method: 'post',
  url: 'https://clgup.nablasol.net/rest/v11_1/cdr-to-call',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


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
