const moviesService = require("../services/movies.service");
const validateMovies = require("../validation/movies.validate");

/**
 * ---- Get Movies ----
 * @returns {Movie[]}
 */
exports.get = async (_req, res, next) => {
  try {
    const movies = await moviesService.find();
    return res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

/**
 * ----- Create Movie -----
 * @returns {Movie}
 */
exports.create = async (req, res, next) => {
  try {
    const { value, error } = validateMovies(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const movie = await moviesService.create({ ...value });
    return res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Get Specific Movie by Id ----
 * @returns {Movie}
 */
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.findByProperty("_id", id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: "The movie with the given ID was not found." });
    }

    return res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Update Specific Movie by Id ----
 * @returns {Movie}
 */
exports.updateById = async (req, res, next) => {
  try {
    const { value, error } = validateMovies(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const movie = await moviesService.update(req.params.id, { ...value });
    if (!movie) {
      return res
        .status(404)
        .json({ message: "The movie with the given ID was not found." });
    }

    return res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

/**
 * ---- Delete Specific Movie by Id ----
 * @returns {null}
 */
exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.findByProperty("_id", id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: "The movie with the given ID was not found." });
    }
    await movie.deleteOne();
    return res.status(204).json(movie);
  } catch (err) {
    next(err);
  }
};
