// this file is used to Resgisteration of the user
/* ====================================================================================== */
// import express
const express = require("express");

// import router
const router = express.Router();

const validateUser = require("../middlewares/UserValidatorMW");

const { User } = require("../models/userModel");

const bcrypt = require("bcrypt");

// set cookiesOptions
const cookieOptions = {
  expires: new Date(Date.now() + 3600000),
  httpOnly: true, // the cookie can not be accessed by the client
  secure: process.env.NODE_ENV === "production" ? true : false, // only secure cookie in production
  sameSite: "Lax",
};

const sendResponse = async (res, user, state) => {
  const token = user.generateAuthToken();
  const refershToken = user.generateRefreshToken();

  const updated = await User.findByIdAndUpdate(user._id, {
    refershToken: refershToken,
  });
  console.log(updated, "updated");

  res.cookie("jwt", refershToken, cookieOptions);

  user.password = undefined;
  res.status(state).json({ status: "success", token, user });
};

router.post("/", validateUser, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select("+password");
    if (user) {
      return res.status(400).send("User already registered");
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      city: req.body.city,
      email: req.body.email,
      password: hashedPassword,
      refershToken: "",
    });

    sendResponse(res, newUser, 201);
  } catch (e) {
    for (let i in e.errors) {
      console.log(e.errors[i].message);
      res.status(400).send("Bad request .............");
    }
  }
});

module.exports = router;
