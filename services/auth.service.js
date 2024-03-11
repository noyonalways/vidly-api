const { isValidObjectId } = require("mongoose");
const error = require("../utils/error");
const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");

/**
 * ----- Find User by property -----
 * @param {string} key
 * @param {string} value
 * @returns {Promise<User|null>}
 */
const findByProperty = (key, value) => {
  if (key === "_id") {
    if (!isValidObjectId(value)) throw error("Invalid User Id", 400);
    return User.findById(value);
  } else {
    return User.findOne({ [key]: value });
  }
};

/**
 * ----- Create a new user -----
 * @param {{name: string, email: string, password: string}}
 * @returns {User}
 */
const register = async (data) => {
  let user = await findByProperty("email", data.email);
  if (user) throw error("User already registered", 409);

  user = new User(_.pick(data, ["password", "name", "email"]));

  // DONE: change the salt gen into the .env file
  const salt = await bcrypt.genSalt(Number(config.get("slatGen")));
  user.password = await bcrypt.hash(user.password, salt);

  // Generate jwt token
  const token = user.generateToken();

  await user.save();
  return { token, user: _.pick(user, ["_id", "name", "email"]) };
};

/**
 * ----- Login user -----
 * @param {{email: string, password: string}}
 * @returns {Promise<string>} token
 */
const login = async (data) => {
  let user = await findByProperty("email", data.email);
  if (!user) throw error("User not found", 404);

  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) throw error("Invalid email or password", 400);

  // Generate jwt token
  const token = user.generateToken();

  return token;
};

module.exports = {
  register,
  login,
  findByProperty,
};
