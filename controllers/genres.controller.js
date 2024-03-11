const genresService = require("../services/genres.service");
const validateGenres = require("../validation/genres.validate");

/**
 * ---- Get Genres ----
 * @returns {Genre[]}
 */
exports.get = async (_req, res, next) => {
  try {
    const genres = await genresService.find();
    return res.status(200).json(genres);
  } catch (err) {
    next(err);
  }
};

/**
 * ----- Create Genre -----
 * @returns {Genre}
 */
exports.create = async (req, res, next) => {
  try {
    const { value, error } = validateGenres(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const genre = await genresService.create({ ...value });
    return res.status(201).json(genre);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Get Specific Genre by Id ----
 * @returns {Genre}
 */
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const genre = await genresService.findByProperty("_id", id);
    if (!genre) {
      return res.status(404).json({ message: "Invalid ID or Genre not found" });
    }
    return res.status(200).json(genre);
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
    const { value, error } = validateGenres(req.body);
    const genre = await genresService.findByProperty("_id", id);
    if (!genre) {
      return res.status(404).json({ message: "Invalid ID or Genre not found" });
    }
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    genre.name = value.name;
    await genre.save();
    return res.status(200).json(genre);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Delete Specific Genre by Id ----
 * @returns {null}
 */
exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const genre = await genresService.findByProperty("_id", id);
    if (!genre) {
      return res.status(404).json({ message: "Invalid ID or Genre not found" });
    }
    await genre.deleteOne();
    return res.status(204).json(genre);
  } catch (err) {
    next(err);
  }
};
