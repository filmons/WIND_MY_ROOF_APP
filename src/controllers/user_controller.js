const userModel = require("../models/user_model");
const { changeUser } = require("../db/db");

exports.findAllUsers = (request, response) => {
    
	userModel.getAllUsers((error, users) => {
		if (error) {
			response.status(500).json({
				message:
					"Le serveur ne fonctionne plus pour récupérer les users dans le user  contrôleur utilisateur.",
			});
		} else {
			response.status(200).json({
				users,
			});
		}
		//console.log(users); // pour voir tout les users
	});
};
