const db = require("../db/db");

exports.getAllUsers = (callback) => {
	//console.log(getAllUserName) // db.execute
	db.execute(`SELECT * FROM users ;`, (error, result) => {
		if (error) {
			console.log("error:", error);
			callback(error, null);
			return;
		}
		callback(null, result);
	});
};

exports.AddUser = (newUser, callback) => {
	//console.log(newUser)
	db.execute(`INSERT INTO users( first_name,last_name, email, role, password) VALUES ("${newUser.first_name}","${newUser.last_name}","${newUser.email}", "${newUser.role}", "${newUser.password}");`,
		(error, result) => {
			if (error){
				console.log("error: ", error);
				callback(error, null);
				return;
			}
			callback(null, result);
		}
	);
};

exports.chikingUser = (userdata, Callback) => {
	db.execute(`SELECT * FROM users where email ="${userdata}";`,
		(error, result) => {
			if (error) {
				console.log("error:", error);
				Callback(error, null);
			}
			console.log(result);
			Callback(null, result);
		}
	);
};

exports.chikingUserData = (userdata, Callback) => {
	db.query(
		`SELECT * FROM users where email ="${userdata.email}"  ;`,
		(error, result) => {
			if (error) {
				console.log("error:", error);
				Callback(error, null);
			}
			//console.log(result)
			Callback(null, result);
		}
	);
};
