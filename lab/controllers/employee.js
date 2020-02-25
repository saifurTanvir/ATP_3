var express = require('express');
var empModel = require.main.require('./models/employee-model');
var router = express.Router();

router.get("/home", function(req, res){
	res.render("employee/home");
});


router.get("/", function(req, res){
	res.render("employee/index");
});

router.post('/', function(req, res){
	var user ={
		username: req.body.username,
		password: req.body.password
	};

	empModel.validate(user, function(status){
	 	if(status){
			res.cookie('username', req.body.uname);
			res.redirect('/employee/home');
		}else{
			res.send('invalid username/password');
		}
	});
});



module.exports = router;