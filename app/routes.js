const router = require("express").Router();

/**
 * ---- Require Routes ----
 */
const home = require("../routes/home.route");
const genres = require("../routes/genres.route");
const customers = require("../routes/customers.route");
const movies = require("../routes/movies.route");
const rentals = require("../routes/rentals.route");
const authRoutes = require("../routes/auth.route");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

/**
 * ---- Use Routes ----
 */
router.use("/", home);
router.use("/api/genres", genres);
router.use("/api/customers", [auth, admin], customers);
router.use("/api/movies", movies);
router.use("/api/rentals", rentals);
router.use("/api/auth", authRoutes);

module.exports = router;
