/**
 * ----- Customer Error -----
 * @param {string} msg
 * @param {number} status
 * @returns {Error} err
 */
function error(msg = "Something went wrong", status = 500) {
  const err = new Error(msg);
  err.status = status;
  return err;
}

module.exports = error;
