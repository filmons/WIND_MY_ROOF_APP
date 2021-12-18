const express = require("express");
const userRouter = express.Router();




const ContrlUser = require("../controllers/user_controller");

userRouter.get("/users", ContrlUser.findAllUsers);
userRouter.get("/user/:id",ContrlUser.OneUsers);

userRouter.post("/signup",ContrlUser.newUser);
userRouter.post("/login",ContrlUser.findUser);

module.exports = userRouter;