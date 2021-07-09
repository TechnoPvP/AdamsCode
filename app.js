const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const log = require('./logger/logger');
const { db } = require('./utils/mUtil');
const session = require('express-session');
const mongoSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// Authentcation Routers
const logoutRouter = require('./routes/auth/logout');
const loginRouter = require('./routes/auth/login');
const registerRouter = require('./routes/auth/register');
const userRouter = require('./routes/user');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
require('dotenv').config();

var app = express();
// app.use(connectLiveReload());

if (process.NODE_ENV == null) require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  Set the public & uploads path to static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// TODO Clean up app.js
app.get('/ping', (req, res) => {
	res.status(200).send('Response Checked.');
});

app.post('/ping', (req, res) => {
	res.status(200).send('Response Checked.');
});

// Connectes to the database, breaks if it can't connect.
db.connect((err) => {
	if (err) throw new Error('Stopping right here');
});

// Setup mongo session store.
var store = new mongoSession({
	uri                : process.env.DB_URI,
	collection         : 'session',
	autoRemove         : 'interval',
	autoRemoveInterval : 10
});
// Catch any errors if they occure while creating session store.
store.on('error', function(error) {
	console.log(error);
});

// Create session data
const sessionData = {
	secret            : 'adawdawdadawdwa',
	resave            : false,
	saveUninitialized : false,
	store             : store,
	cookie            : { maxAge: 3600000 * 2 }
};
app.use(session(sessionData));
app.use(flash());

// Register Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
	next();
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// TODO Render error page
	res.status(err.status || 500);
	res.render('template/error', {});
});

module.exports = app;
