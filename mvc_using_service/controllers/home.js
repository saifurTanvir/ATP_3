var express = require('express'); 
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var registerModel = require.main.require('./models/register-Model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id, 
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

router.get('/delete/:id', function(req, res){
	userModel.delete(req.params.id, function(status){
		if(status){
				console.log("Deleted Successfully!");
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		
	});
});

router.get("/addUser", function(req, res){
	res.render("home/register");
});

router.post("/addUser", function(req, res){
	var data = {
		name: req.body.name,
		username: req.body.username,
		gander: req.body.gander,
		type: req.body.type ,
		res: req.body.res,
		password: req.body.password
	};


	var data1 = req.body.name + " " + req.body.username+ " " + req.body.gander + " "
	+req.body.type + " " + req.body.res+ " " +req.body.password;
	console.log(data1);

	registerModel.insert(data, function(status){
		if(status){
			console.log("registered");
			res.redirect("/home");
		}
		else{
			console.log("Not registered");
		}
		
	});

	

});
module.exports = router;