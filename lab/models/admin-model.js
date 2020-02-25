var db = require('./db');

module.exports= {
	insert: function(user, callback){
		var sql = "insert into emplyee values(?,?,?,?,?)";
		db.execute(sql, [null, user.name, user.contact, user.username, user.password], function(status){
			if(status){
				console.log("Okay");
				
				callback(true);
			}else{
				console.log("Not Okay")

				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from emplyee";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getById : function(id, callback){
		var sql = "select * from emplyee where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	update : function(user, callback){
		var sql = "update emplyee set name=?, contact=?, username=?, password=? where id=?";
		db.execute(sql, [user.name, user.contact, user.username, user.password, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from emplyee where id=?";
		db.execute(sql, [user], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
	
	
}