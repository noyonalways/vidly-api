const Joi = require("joi");

/**
 *
 * @param {{name: string, phone: string, isGold: boolean}} genre
 * @returns
 */
function validateCustomers(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(5).max(20).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(genre, { abortEarly: false });
}

module.exports = validateCustomers;
