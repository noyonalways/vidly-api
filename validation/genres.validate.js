const Joi = require("joi");

/**
 * Validates genre data
 * @param {{name: string}} genre
 * @returns {Object} - An object containing validation results.
 * @property {boolean} isValid - A boolean indicating whether the validation passed.
 * @property {Object[]} errors - An array of validation errors.
 * @property {string} errors[].message - The error message.
 * @property {string} errors[].path - The path to the field where the error occurred.
 */
function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(genre);
}

module.exports = validateGenres;
