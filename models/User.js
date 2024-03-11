const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/**
 *
 * @returns
 */
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtSecretKey")
  );
  return token;
};

const User = model("User", userSchema);
module.exports = User;
