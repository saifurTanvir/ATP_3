//declaration
var express = require('express');
var employee = require('./controllers/employee');
var admin = require('./controllers/admin');
var logout = require('./controllers/logout');
var ejs = require('ejs');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//configuration
app.set('view engine', 'ejs');

//middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());

app.use('/abc', express.static('xyz'));

app.use('/admin', admin);
app.use('/employee', employee);


//routes
app.get('/', function(req, res){
	res.render("admin/index")
});



//server startup
app.listen(3000, function(){
	console.log('node server started at 3000!');
});