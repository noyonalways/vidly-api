const logger = require("../logger");

/**
 * ----- Not found Handler -----
 * @param {*} _req
 * @param {*} _res
 * @param {*} next
 */
exports.notFoundHandler = (_req, _res, next) => {
  const error = new Error("Resource not found!");
  error.status = 404;
  next(error);
};

/**
 * ----- Global Error Handler -----
 * @param {*} err
 * @param {*} _req
 * @param {*} res
 * @param {*} _next
 */
exports.errorHandler = (err, _req, res, _next) => {
  logger.error(err.message);

  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
};
