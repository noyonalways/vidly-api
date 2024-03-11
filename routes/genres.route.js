const genresController = require("../controllers/genres.controller");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const router = require("express").Router();

router
  /**
   * * @route /api/genres
   */
  .route("/")

  /**
   * @route /api/v1/users
   * @method GET
   */
  .get(genresController.get)

  /**
   * @route /api/v1/users
   * @method POST
   */
  .post([auth, admin], genresController.create);

router
  /**
   * @route /api/genres/:id
   */
  .route("/:id")

  /**
   * @method GET
   */
  .get(genresController.getById)

  /**
   * @method PUT
   */
  .put([auth, admin], genresController.updateById)

  /**
   * @method DELETE
   */
  .delete([auth, admin], genresController.deleteById);

module.exports = router;
