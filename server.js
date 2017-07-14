// Process cmdline arguments
var args = process.argv.slice(2);
if(args[0] == 'release') {
    global.release = true;
}

// dependencies
var express = require('express');
var routes = require('./controllers/routes');
var bodyParser = require('body-parser');

// init app
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// process all the routes making the socket object accessible to the router
routes(app, router, io);

// Start the server
server.listen(9999, function() {
    if(global.release) {
        console.log('server listening in release mode');
    }
    else {
        console.log('server listening in debug mode');
    }
});