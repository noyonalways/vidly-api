const Joi = require("joi");

/**
 * Validates movie data
 * @param {{title: string, genre: string, numberInStock: number, dailyRentalRate: number}} movie
 * @returns {Object} - An object containing validation results.
 * @property {boolean} isValid - A boolean indicating whether the validation passed.
 * @property {Object[]} errors - An array of validation errors.
 * @property {string} errors[].message - The error message.
 * @property {string} errors[].path - The path to the field where the error occurred.
 */
function validateMovies(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
}

module.exports = validateMovies;
