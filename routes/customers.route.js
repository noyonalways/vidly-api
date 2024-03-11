const customerController = require("../controllers/customers.controller");
const router = require("express").Router();

router
  /**
   * @route /api/customers
   */
  .route("/")
  /**
   * @method GET
   */
  .get(customerController.get)
  /**
   * @method POST
   */
  .post(customerController.create);

router
  /**
   * @route /api/customers/:Id
   */
  .route("/:id")
  /**
   * @method GET
   */
  .get(customerController.getById)
  /**
   * @method PUT
   */
  .put(customerController.updateById)
  /**
   * @method DELETE
   */
  .delete(customerController.deleteById);

module.exports = router;
