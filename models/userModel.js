// in this file we will create user model
// we will use the user model to interact with the database
// we will use the user model to perform CRUD operations
// 1) import mongoose
// 2) create a schema
// 3) create a model

// import mongoose
const mongoose = require("mongoose");

const validator = require("validator");

const jwt = require("jsonwebtoken");

require("dotenv").config();

// create a schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "email is not valid",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  refershToken: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userid: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({ userid: this._id }, process.env.JWT_REFERSH_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};

// export the model
exports.User = mongoose.model("users", userSchema);
