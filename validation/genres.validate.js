const Joi = require("joi");

/**
 *
 * @param {{name: string}} genre
 * @returns
 */
function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(genre);
}

module.exports = validateGenres;
