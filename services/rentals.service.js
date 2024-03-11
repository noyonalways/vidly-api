const moviesService = require("./movies.service");
const customerService = require("./customers.service");
const error = require("../utils/error");
const Rental = require("../models/Rental");
const { isValidObjectId } = require("mongoose");

/**
 * ----- Find Rentals -----
 * @returns {Promise<Array<Rental>>}
 */
exports.find = () => {
  return Rental.find().sort("-dateOut");
};

/**
 * ----- Find Rental by Id -----
 * @param {string} key
 * @param {string} value
 * @returns {Promise<Rental|null>}
 */
exports.findByProperty = (key, value) => {
  if (key === "_id") {
    if (!isValidObjectId(value)) throw error("Invalid Rental Id", 400);
    return Rental.findById(value);
  } else {
    return Rental.find({ [key]: value });
  }
};

/**
 * ----- Create a Rental -----
 * @param {{customer: string, movie: string}} data
 * @returns {Promise<Rental>}
 */
exports.create = async (data) => {
  const customer = await customerService.findByProperty("_id", data.customer);
  if (!customer) throw error("Invalid customer or customer not found", 404);

  const movie = await moviesService.findByProperty("_id", data.movie);
  if (!movie) throw error("Invalid movie or movie not found", 404);

  if (movie.numberInStock === 0) throw error("Movie is not in stock", 400);

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  return rental;
};
