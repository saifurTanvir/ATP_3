var express = require('express'); 
var router = express.Router();
var adminModel = require.main.require('./models/admin-model');

router.get("/addEmployee", function(req, res){
	res.render("admin/addEmployee");
});

router.post("/addEmployee", function(req, res){
	var data = {
		name: req.body.name,
		contact: req.body.contact,
		username: req.body.username,
		password: req.body.password
	}

	adminModel.insert(data, function(status){
		if(status){
			console.log("Employee register success!");
			res.redirect("/");
		}
		else{
			console.log("Employee register fails!!!");
		}
	});

});

router.get("/viewEmployee", function(req, res){
	adminModel.getAll(function(results){
		if(results.length > 0){
			res.render('admin/viewEmployee', {userlist: results});
		}else{
			res.redirect('admin/home');
		}
	});
});

router.get('/editEmployee/:id', function(req, res){
	adminModel.getById(req.params.id, function(result){
		res.render('admin/editEmployee', {user: result});
	});
});

router.post('/editEmployee/:id', function(req, res){
	
		var user = {
			id: req.params.id, 
			name: req.body.name,
			contact: req.body.contact,
			username: req.body.username,
			password: req.body.password
			
		};

		adminModel.update(user, function(status){
			if(status){
				res.redirect('/admin/editEmployee/'+req.params.id);       
			}else{
				res.redirect('/admin/editEmployee/'+req.params.id);
			}
		});
});

router.get('/deleteEmployee/:id', function(req, res){
	adminModel.delete(req.params.id, function(status){
		if(status){
				console.log("Deleted Successfully!");
				res.redirect('/');
			}else{
				res.redirect('/');
			}
		
	});
});

module.exports = router;