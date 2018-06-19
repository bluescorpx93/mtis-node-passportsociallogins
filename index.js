var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');

var apiApp = express();
var environmentVariables = require('dotenv').config();
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');
var typeorm = require('typeorm');
var dbConfigOptions = require('./config/dbConfigOptions');

typeorm.createConnection(dbConfigOptions).then( async connection => {

  apiApp.use(morgan('dev'));
  apiApp.use(cookieParser());
  apiApp.use(bodyParser.json());
  apiApp.use(bodyParser.urlencoded({extended: false}));
  apiApp.use(express.static('public'));
  apiApp.set('view engine', 'ejs');
  apiApp.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true
  }));
  apiApp.use(passport.initialize());
  apiApp.use(passport.session());

  require('./config/passport')(passport);
  require('./routes/routes.js')(apiApp, passport);

  var privateKey  = fs.readFileSync('key.pem', 'utf8');
  var certificate = fs.readFileSync('cert.pem', 'utf8');

  var httpsOptions = {
    key : privateKey,
    cert: certificate,
    passphrase: "passphrase"
  }

  http.createServer(apiApp).listen(process.env.BACKEND_PORT-500, () => {
    console.log("Backend Running on Port :", process.env.BACKEND_PORT-500);
  });

  https.createServer(httpsOptions, apiApp).listen(process.env.BACKEND_PORT, () => {
    console.log("Backend Running on Port :", process.env.BACKEND_PORT);
  });

}).catch(err => {
  console.log("SETUP ERR ",err);
})
