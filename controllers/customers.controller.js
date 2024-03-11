const customerService = require("../services/customers.service");
const validateCustomers = require("../validation/customers.validate");

/**
 * ---- Get Genres ----
 * @returns {Customer[]}
 */
exports.get = async (_req, res, next) => {
  try {
    const customers = await customerService.find();
    return res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

/**
 * ----- Create Customer -----
 * @returns {Customer}
 */
exports.create = async (req, res, next) => {
  try {
    const { value, error } = validateCustomers(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const customer = await customerService.create({ ...value });
    return res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Get Specific Customer by Id ----
 * @returns {Genre}
 */
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.findByProperty("_id", id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Update Specific Genre by Id ----
 * @returns {Genre}
 */
exports.updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value, error } = validateCustomers(req.body);
    const customer = await customerService.findByProperty("_id", id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    customer.set({
      ...value,
    });
    await customer.save();
    return res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Delete Specific Customer by Id ----
 * @returns {null}
 */
exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.findByProperty("_id", id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customer.deleteOne();
    return res.status(204).json(customer);
  } catch (err) {
    next(err);
  }
};
