const router = require("express").Router();
const moviesController = require("../controllers/movies.controller");

router
  /**
   * @route /api/movies
   */
  .route("/")
  /**
   * @method GET
   */
  .get(moviesController.get)
  /**
   * @method POST
   */
  .post(moviesController.create);

router
  /**
   * @route /api/movies/:id
   */
  .route("/:id")
  /**
   * @method GET
   */
  .get(moviesController.getById)
  /**
   * @method PUT
   */
  .put(moviesController.updateById)
  /**
   * @method DELETE
   */
  .delete(moviesController.deleteById);

module.exports = router;
