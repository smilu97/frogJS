var bodyParser = require('body-parser')
var express = require('express')
var session = require('express-session')
var fs = require('fs')
var mysql = require('mysql')

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


app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
	console.log('Server started')
})


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(session({
	secret: 'password',
	resave: false,
	saveUninitialized: true
}))

var mainRouter = require('./router/mainRouter')(app, fs, dbc)
var postRouter = require('./router/postRouter')(app, fs, dbc)
var userRouter = require('./router/userRouter')(app, fs, dbc)