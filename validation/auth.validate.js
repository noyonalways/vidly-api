const Joi = require("joi");

/**
 * Validate registration user
 * @param {{name: string, email: string, password: string}} user
 * @returns {Object} - An object containing validation results.
 * @property {boolean} isValid - A boolean indicating whether the validation passed.
 * @property {Object[]} errors - An array of validation errors.
 * @property {string} errors[].message - The error message.
 * @property {string} errors[].path - The path to the field where the error occurred.
 */
function validateRegister(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(user, { abortEarly: false });
}

/**
 * Validate Login user
 * @param {{email: string, password: string}} user
 * @returns {Object} - An object containing validation results.
 * @property {boolean} isValid - A boolean indicating whether the validation passed.
 * @property {Object[]} errors - An array of validation errors.
 * @property {string} errors[].message - The error message.
 * @property {string} errors[].path - The path to the field where the error occurred.
 */
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(user, { abortEarly: false });
}

module.exports = {
  validateRegister,
  validateLogin,
};
