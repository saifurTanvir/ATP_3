var db = require('./db');

module.exports= {
	insert: function(user, callback){
		var sql = "insert into register values(?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.name, user.username, user.gander, user.type, user.res, user.password], function(status){
			if(status){
				console.log("Okay");
				
				callback(true);
			}else{
				console.log("Not Okay")

				callback(false);
			}
		});
	},
	
}