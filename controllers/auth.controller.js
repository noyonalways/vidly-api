const authService = require("../services/auth.service");
const {
  validateRegister,
  validateLogin,
} = require("../validation/auth.validate");

/**
 * ---- Register a new User ----
 * @returns {User}
 */
exports.register = async (req, res, next) => {
  try {
    const { value, error } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { token, user } = await authService.register({ ...value });
    return res.header("x-auth-token", token).status(201).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * ----- Login User -----
 * @returns {Token}
 */
exports.login = async (req, res, next) => {
  try {
    const { value, error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const token = await authService.login({ ...value });

    res.status(200).json(token);
  } catch (err) {
    next(err);
  }
};

/**
 * ----- Get Login user info -----
 * @returns {User}
 */
exports.get = async (req, res, next) => {
  try {
    const user = await authService
      .findByProperty("key", req.body._id)
      .select("-password");

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
