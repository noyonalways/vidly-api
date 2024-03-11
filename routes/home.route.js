const router = require("express").Router();

/**
 * @route /
 */
router.get("/", (_req, res) => {
  res.json({
    health: "OK",
    status: 200,
    message: "Hello form the Vidly Genres API's Server",
  });
});

/**
 * @route /
 */
router.get("/health", (_req, res) => {
  res.json({
    health: "OK",
    status: 200,
    message: "Hello form the Vidly Genres API's Server is Healthy.",
  });
});

module.exports = router;
