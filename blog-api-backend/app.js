var createError = require('http-errors');
var express = require('express');
const cors= require("cors");
var path = require('path');
const session= require ("express-session");
const passport= require("passport");
const LocalStrategy= require ("passport-local").Strategy;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const compression= require("compression");
const helmet= require("helmet");

//jwt 
const JwtStrategy= require("passport-jwt").Strategy;
const ExtractJwt= require("passport-jwt").ExtractJwt;
const jwt= require("jsonwebtoken");
const User= require("./models/userModel");

const options={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, //jwt secret key
};

passport.use(
  new JwtStrategy(options, (jwt_payload, done)=>{
    // jwt_payload contains the decoded JWT token
    // You should use it to extract user information and perform authentication

    // Example: Check if a user with the ID in the JWT payload exists
    User.findById(jwt_payload.sub, (err, user) => {
      if (err) {
        return done(err, false); // Return an error if there's an issue
      }
      if (user) {
        return done(null, user); // Return the user if found
      } else {
        return done(null, false); // Return false if no user is found
      }
    });
  })
);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter= require("./routes/blogRouter")

var app = express();

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(cors()); //allow access from any front end site

//ex. allow access only from "http://localhost:5173"
// app.use(cors({
//   origin: "http://localhost:5173"
// }));

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dev_db_url = process.env.mongoConnectionStr;
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//setup local strategy login
// app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

app.use(compression()); //compress all routes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/blog", blogRouter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

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
  // res.render('error');
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
