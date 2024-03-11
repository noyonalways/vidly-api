const Joi = require("joi");

/**
 *
 * @param {{customer: string, movie: string, dataOut: string, dateReturned: string, rentalFee: number}} rental
 * @returns
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
