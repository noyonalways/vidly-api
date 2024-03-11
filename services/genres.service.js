const { isValidObjectId } = require("mongoose");
const { Genre } = require("../models/Genre");
const error = require("../utils/error");

/**
 * ----- Find Genres -----
 * @returns {Promise<Array<Genre>>}
 */
exports.find = () => {
  return Genre.find().sort("name");
};

/**
 * ----- Find Genre by Id -----
 * @param {string} key
 * @param {string} value
 * @returns {Promise<Genre|null>}
 */
exports.findByProperty = (key, value) => {
  if (key === "_id") {
    if (!isValidObjectId(value)) throw error("Invalid Genre Id", 400);
    return Genre.findById(value);
  } else {
    return Genre.findOne({ [key]: value });
  }
};

/**
 * ----- Create a Genre -----
 * @param {{name: string}} data
 * @returns {Promise<Genre>}
 */
exports.create = (data) => {
  const genre = new Genre({ ...data });
  return genre.save();
};
