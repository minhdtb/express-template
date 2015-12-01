var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/app')[env];

mongoose = require('mongoose');
mongoose.connect(config.db);

var models_dir = __dirname + '/models';
var fs = require('fs');
fs.readdirSync(models_dir).forEach(function (file) {
    if (file[0] === '.') return;
    require(models_dir + '/' + file);
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

passport = require("passport");
require('./config/passport')(passport, config);

var session = require('express-session');
app.use(session({
    secret: '1qaz2wsx!@',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app, passport);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
