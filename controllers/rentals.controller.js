const rentalsService = require("../services/rentals.service");
const validateRentals = require("../validation/rentals.validate");

/**
 * ---- Get Rentals ----
 * @returns {Rental[]}
 */
exports.get = async (_req, res, next) => {
  try {
    const rentals = await rentalsService.find();
    return res.status(200).json(rentals);
  } catch (err) {
    next(err);
  }
};

/**
 * ----- Create Rental -----
 * @returns {Rental}
 */
exports.create = async (req, res, next) => {
  try {
    const { value, error } = validateRentals(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const rental = await rentalsService.create({ ...value });
    return res.status(201).json(rental);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Get Specific Rental by Id ----
 * @returns {Rental}
 */
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rental = await rentalsService.findByProperty("_id", id);
    if (!rental) {
      return res
        .status(404)
        .json({ message: "Invalid ID or Rental not found" });
    }
    return res.status(200).json(rental);
  } catch (err) {
    next(err);
  }
};
