const Joi = require("joi");

/**
 *
 * @param {{title: string, genre: string, numberInStock: number, dailyRentalRate: number}} movie
 * @returns
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
