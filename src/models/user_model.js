const db = require("../db/db");

exports.getAllUsers = (callback) => {
	//console.log(getAllUserName) // db.execute  
	db.query(`SELECT * FROM users ;`, (error, result) => {
		if (error) {
			console.log("error:", error);
			callback(error, null);
			return;
		}
		callback(null, result);
	});
};