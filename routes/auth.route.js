const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const authenticate = require("../middlewares/auth");

/**
 * @route /api/auth/register
 * @method POST
 */
router.post("/register", authController.register);

/**
 * @route /api/auth/login
 * @method POST
 */
router.post("/login", authController.login);

/**
 * @route /api/auth/me
 * @method GET
 * @private
 */
router.get("/me", authenticate, authController.get);

module.exports = router;
