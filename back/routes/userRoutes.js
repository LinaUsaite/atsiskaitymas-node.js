const express = require("express");
const { signup, login,protect, logout } = require("../controllers/authController");
const { validateBody } = require("../middlewares/validation_middlewares");
const userSchema = require("../validationSchemas/userSchema");
const loginSchema = require("../validationSchemas/loginSchema")

const userRouter = express.Router();

userRouter.route("/signup").post(validateBody(userSchema), signup);
userRouter.route("/login").post(validateBody(loginSchema), login);
userRouter.route("/logout").get(protect, logout);

module.exports = userRouter;
