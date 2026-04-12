const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const userRouter = require("./routes/userRoutes");

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());


//middleware to parce cookies
app.use(cookieParser());



app.use("/api/v1/users", userRouter);


//Butinai paskutine
app.use(errorMiddleware);

module.exports = app;