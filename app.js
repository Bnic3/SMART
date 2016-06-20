var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rek = require("rekuire");

//custom add
var passport = require("passport");
var flash = require('connect-flash');
var rek = require("rekuire");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

//libs
var mongoose = require("./libs/database");
var loader = require("./libs/loader");
var authentication = require("./libs/authentication");


var routes = require('./routes/index');

var app = express();

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

//store sessions
var sessionStore = null;
mongoose.connection.once("open", function(err){
    if(err) throw err;
    sessionStore = new MongoStore({mongooseConnection:mongoose.connection});
});

app.use(session({
    secret: "somelongassname",
    store: sessionStore,
    clear_interval: 900,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



app.use('/', routes);


authentication(app);
loader(app);

module.exports = app;
