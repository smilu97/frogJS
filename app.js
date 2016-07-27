var bodyParser = require('body-parser')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var csrf = require('csurf')
var helmet = require('helmet')
var fs = require('fs')
var mysql = require('mysql')
var busboy = require('connect-busboy')

var app = express()

var dbc = mysql.createConnection( {
	host : 'localhost',
	port : 3306,
	user : 'tester',
	password : '12341234',
	database: 'frog'
})
dbc.connect(function(err) {
	if(err) {
		console.error('mysql connetion error')
		console.error(err)
		throw err
	}
	console.log('mysql connected')
})

app.set('port', process.env.PORT | 3000);
app.set('views', __dirname+'/views')
app.set('view engine', 'ejs')
app.use(cookieParser('cookieSecret'))
app.use(helmet())

app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
	console.log('Server started')
})


app.use(express.static('public'))
app.use(busboy())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(session({
	secret: 'password',
	resave: false,
	saveUninitialized: true
}))

app.use(csrf())
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});
app.use(function (err, req, res, next) {
	if (err.code !== 'EBADCSRFTOKEN') return next(err)
	// handle CSRF token errors here
	res.render('csrf_error_page')
})


var mainRouter = require('./router/mainRouter')(app, fs, dbc)
var userRouter = require('./router/userRouter')(app, fs, dbc)
var dinerRouter = require('./router/dinerRouter')(app, fs, dbc)
