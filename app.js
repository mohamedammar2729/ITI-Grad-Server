// import express
// it will return a function(req, res, next) => { return an object named app }
const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// import dotenv
require("dotenv").config();

const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/* ======================================================================================= */

const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const readyprogramRouter = require("./routes/readyprogram");
const placesRouter = require("./routes/places");
const homeRouter = require("./routes/home");
const avatarRouter = require("./routes/avatar");
const createprogramRouter = require("./routes/createprogram");
const refereshTokenRouter = require("./routes/refereshToken");

/* ===================== set connection to the mongo database ============================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection successful to mongo database");
  })
  .catch((e) => {
    console.log(e);
  });
/* ========================= app is considered as a server ============================== */
const app = express();
const port = process.env.PORT;
/* ====================================================================================== */
// middleware use to parse the body of the request and store it in req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/user", userRouter); // use the user router
app.use("/api/login", loginRouter); // use the login router
app.use("/api/readyprogram", readyprogramRouter); // use the readyprogram router
app.use("/api/places", placesRouter); // use the places router
app.use("/api/createprogram", createprogramRouter); // use the createprogram router
app.use("/api/refereshtoken", refereshTokenRouter); // use the refereshToken router
app.use("/api/home", homeRouter); 
app.use("/api/avatar", avatarRouter); // use the home router

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
