require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const engine = require('ejs-mate');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

// const passportConfig = require('./config/passport');

const landingRouter = require('./routes/landing');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

// passportConfig(passport);

app.use('/', landingRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.url = req.url;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err.message);
});

module.exports = app;
