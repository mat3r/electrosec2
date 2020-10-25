// external dependencies
const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const exphbs       = require('express-handlebars');
const mongoose     = require('mongoose');
const dotenv       = require('dotenv');
const session      = require('express-session');
const flash        = require('connect-flash');

// internal dependencies
const indexRouter     = require('./routes/index');

// framework for NodeJS
const app = express();

// use global variables
dotenv.config();

// configure and establish DB connection
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
  useUnifiedTopology: true
});

// set event-listener once for DB onnection and listen for errors
mongoose.connection
	.once('open', function() {
		console.log('[mongoose] connected to MongoDB ...');
	})
	.on('error', function(err) {
		console.log('[mongoose] error connecting to MongoDB: ', err);
	});

// view engine setup: express-handlebars
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'website',
	partialsDir: __dirname + '/views/partials/',
	layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setting up cors
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// various middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: '5i!!en5tede',
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);

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
