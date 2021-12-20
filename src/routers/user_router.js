const express    = require("express");
const userRouter = express.Router();


const UserController = require("../controllers/user_controller");

userRouter.get("/users", UserController.findAllUsers);
userRouter.get("/user/:id",UserController.OneUsers);
userRouter.post("/signup",UserController.newUser);
userRouter.post("/login",UserController.findUser);

module.exports = userRouter;