const express = require("express");
const {
  register,
  login,
  protect,
  logout,
} = require("../controllers/userController");

const { validatedBody } = require("../middlewares/validationMiddleware");
const userSchema = require("../validationSchemas/userSchema");
const loginSchema = require("../validationSchemas/loginShema");

const userRouter = express.Router();

userRouter.route("/register").post(validatedBody(userSchema), register);
userRouter.route("/login").post(validatedBody(loginSchema), login);
userRouter.route("/logout").get(protect, logout);

module.exports = userRouter;