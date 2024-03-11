const { isValidObjectId } = require("mongoose");
const Customer = require("../models/Customer");
const error = require("../utils/error");

/**
 * ----- Find Genres -----
 * @returns {Promise<Array<Customer>>}
 */
exports.find = () => {
  return Customer.find().sort("name");
};

/**
 * ----- Find Customer by Id -----
 * @param {string} key
 * @param {string} value
 * @returns {Promise<Customer|null>}
 */
exports.findByProperty = (key, value) => {
  if (key === "_id") {
    if (!isValidObjectId(value)) throw error("Invalid Customer Id", 400);
    return Customer.findById(value);
  } else {
    return Customer.findOne({ [key]: value });
  }
};

/**
 * ----- Create a Customer -----
 * @param {{name: string, phone: string, isGold: boolean}} data
 * @returns {Promise<User>}
 */
exports.create = (data) => {
  const customer = new Customer({ ...data });
  return customer.save();
};
