const userModel = require("../models/user_model");
const { changeUser } = require("../db/db");
const bcrypt = require("bcrypt");
const body_parser = require("body-parser");
const jwt = require("jsonwebtoken");
const SECRET = "motSecret";

const MAXAGE = Math.floor(Date.now() / 100) + 10 * 10;


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
exports.OneUsers = (request, response) => {
	const {id} = request.params;
	userModel.getOneUser( id,  ( error,result) => {
		if (error) {
			response.status(500).json({
				message:
					"Le serveur ne fonctionne plus pour récupérer les users dans le user  contrôleur utilisateur.",
			});
		} else {
			response.status(200).json({
				result,
			});
		}
		//console.log(result); // pour voir tout les users
	});
};

// adding user or sigup start  here

exports.newUser = (request, response) => {
	const { first_name, last_name, email, role, password } = request.body;

	if (role.length === 0 ) {
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

/// here start login 
exports.findUser = (request, response) => {
	const userdata = ({email,password } = request.body);
	userModel.chikingUserData(userdata, (error, result) => {
		if (result.length === 0) {
			response.status(401).json({
				message: "check your email because this email does not exist",
			});
		} else {
			const hash = result[0].password;

			bcrypt.compare(password, hash, (error, correct) => {
				if (!correct) {
					response.status(401).json({
						message: "verify your password the password is not correct",
					});
				}

				const user = {
					id: result[0].id,
					first_name: result[0].first_name,
					last_name: result[0].last_name,
					email: result[0].email,
					role: result[0].role,
					password: result[0].password,
					exp: MAXAGE,
				};

				jwt.sign(user, SECRET, (error, token) => {
					if (error) {
						response.status(500).json({
							message: error,
						});
					}

					request.user = {
						id: result[0].id,
						first_name: result[0].first_name,
						last_name: result[0].last_name,
						email: result[0].email,
						role: result[0].role,
						password: result[0].password,
					};

					response.cookie("authcookie", token, { maxAge: MAXAGE });
					console.log(response.cookie.authcookie);
					response.status(200).json({
						token: token,
						user: {
							id: request.user.id,
							first_name: request.user.first_name,
							last_name: request.user.last_name,
							role: request.user.role,
							email: request.user.email,
						},
					});
					//console.log("new infrmation");
					return request.user;
				});
			});
		}
	});
};

// exports.findByRole = (request, response) => {
// 	// const {role} = request.params;
// 	userModel.chikingUserDataRole(  ( error,result) => {
// 		if (error) {
// 			response.status(500).json({
// 				message:
// 					"Le serveur ne fonctionne plus pour récupérer les users dans le user  contrôleur utilisateur.",
// 			});
// 		} else {
// 			response.status(200).json({
// 				result,
// 			});
// 		}
// 		//console.log(result); // pour voir tout les users
// 	});
// };
