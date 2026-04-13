const argon2 = require("argon2");
const { createUser, getUserByEmail,getUserByID  } = require("../models/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const sendTokenCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true, //cookie su jwt tokenu nenuskaitytų skriptai
  };

  res.cookie("jwt", token, cookieOptions);
};

//1. user signup
exports.signup = async (req, res, next) => {
  try {
    //nepamiršti validacijos ZOD
    const { password } = req.validatedBody;

    const passwordHash = await argon2.hash(password);

    const newUser = { ...req.validatedBody, password: passwordHash };
    //   console.log(newUser);

    const createdUser = await createUser(newUser);

    //slepiam userio passwordą ir id
    createdUser.password = undefined;
    createdUser.id = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

//2.user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) throw new AppError("Invalid email or password", 401);

    const passwordCorrect = await argon2.verify(user.password, password);

    if (!passwordCorrect) throw new AppError("Invalid email or password", 401);

    const token = signToken(user.id);

    sendTokenCookie(token, res);

    user.password = undefined;

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//3. authentication middleware, protecting routes from unregistered users

exports.protect = async (req, res, next) => {
  try {
    //need to install cookie parser
    let token = req.cookies?.jwt;

    if (!token) throw new AppError("You are not logged in!", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    {
      id: 3;
    }
    // console.log(decoded);
    const currentUser = await getUserByID(decoded.id);

    if (!currentUser)
      throw new AppError(
        "The user belonging ti this token does no longer exist",
        401,
      );

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

// 4. authorization middleware

exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new AppError(
          "You dont have permission to perform this action",
          403,
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.logout = (req, res) => {
  return res.clearCookie("jwt").status(200).json({
    status: "success",
    message: "You are logged out!",
  });
};
