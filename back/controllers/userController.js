const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const {
  createUser,
  getUserByUsername,
  getUserByID,
} = require("../models/userModel");


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenCookie = (token, res) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });
};

//1.user signup
exports.register = async (req, res, next) => {
  try {
    const { password } = req.validatedBody;

    const passwordHash = await argon2.hash(password);

    const newUser = {
      ...req.validatedBody,
      password: passwordHash,
    };

    const createdUser = await createUser(newUser);

    createdUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

//2. user signup
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (!user) {
      throw new AppError("Invalid username or password", 401);
    }

    const passwordCorrect = await argon2.verify(
      user.password,
      password
    );

    if (!passwordCorrect) {
      throw new AppError("Invalid username or password", 401);
    }

    const token = signToken(user.id);

    sendTokenCookie(token, res);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//3.  authentication middleware, protecting routes from unregistered users

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      throw new AppError("You are not logged in!", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await getUserByID(decoded.id);

    if (!currentUser) {
      throw new AppError("User no longer exists", 401);
    }

    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};

//4. authorization middleware

exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new AppError("Forbidden", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");

  res.status(200).json({
    status: "success",
    message: "Logged out",
  });
};
