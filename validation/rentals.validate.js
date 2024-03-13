const Joi = require("joi");

/**
 * Validates rental data
 * @param {{customer: string, movie: string, dataOut: string, dateReturned: string, rentalFee: number}} rental
 * @returns {Object} - An object containing validation results.
 * @property {boolean} isValid - A boolean indicating whether the validation passed.
 * @property {Object[]} errors - An array of validation errors.
 * @property {string} errors[].message - The error message.
 * @property {string} errors[].path - The path to the field where the error occurred.
 */
function validateRentals(rental) {
  const schema = Joi.object({
    customer: Joi.string().required(),
    movie: Joi.string().required(),
    dateOut: Joi.date(),
    dateReturned: Joi.date(),
    rentalFee: Joi.number().min(0),
  });
  return schema.validate(rental);
}

module.exports = validateRentals;
