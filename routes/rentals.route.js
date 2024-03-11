const router = require("express").Router();
const rentalsController = require("../controllers/rentals.controller");

router
  /**
   * @route /api/rentals
   */
  .route("/")
  /**
   * @method GET
   */
  .get(rentalsController.get)
  /**
   * @method POST
   */
  .post(rentalsController.create);

router
  /**
   * @route /api/rentals/:id
   */
  .route("/:id")
  /**
   * @method GET
   */
  .get(rentalsController.getById);
// /**
//  * @method PUT
//  */
// .put(moviesController.updateById)
// /**
//  * @method DELETE
//  */
// .delete(moviesController.deleteById);

module.exports = router;
