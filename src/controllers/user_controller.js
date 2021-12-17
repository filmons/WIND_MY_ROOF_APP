const userModel = require("../models/user_model");
const { changeUser } = require("../db/db");
const bcrypt = require("bcrypt");
const body_parser = require("body-parser");
const jwt = require("jsonwebtoken");

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

// adding youser start  here

exports.newUser = (request, response) => {
	const { first_name, last_name, email, role, password } = request.body;

	if (role.length === 0) {
		response.status(400).json({
			message: "les champs ne peut pas être vide!",
		});
	} else {
		userModel.chikingUser(email, (error, result) => {
			// for chiking user mail
			console.log(changeUser);
			if (result.length !== 0) {
				console.log(result.length);
				response.status(409).json({
					message:
						"Un utilisateur utilisant cette adress email est déjà enregistré !",
				});
			} else {
				const saltRounds = 10;
				bcrypt.hash(password, saltRounds, (error, hash) => {
					if (error) {
						response.status(500).json({
							message: error,
						});
					}
					const newUser = {
						first_name,
						last_name,
						email,
						role,
						password: hash,
					};
					userModel.AddUser(newUser, (error, result) => {
						if (error) {
							response.status(500).json({
								message: error,
							});
							response.send(error.message);
						}

						response.status(201).json({
							message: "Votre nouveau compte a été créé avec succès",
							first_name: newUser.first_name,
							last_name: newUser.last_name,
							role: newUser.role,
							email: newUser.email,
							password: newUser.password,
						});
					});
				});
			}
		});
	}
};
