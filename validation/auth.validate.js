const Joi = require("joi");

/**
 *
 * @param {{name: string}} user
 * @returns
 */
function validateRegister(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(user, { abortEarly: false });
}

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
