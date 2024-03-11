const { isValidObjectId } = require("mongoose");
const Movie = require("../models/Movie");
const genresService = require("./genres.service");
const error = require("../utils/error");

/**
 * ----- Find Movies -----
 * @returns {Promise<Array<Movie>>}
 */
exports.find = () => {
  return Movie.find().sort("title");
};

/**
 * ----- Find Movie by Id -----
 * @param {string} key
 * @param {string} value
 * @returns {Promise<Movie|null>}
 */
exports.findByProperty = (key, value) => {
  if (key === "_id") {
    if (!isValidObjectId(value)) throw error("Invalid Movie Id", 400);
    return Movie.findById(value);
  } else {
    return Movie.findOne({ [key]: value });
  }
};

/**
 * ----- Create a Movie -----
 * @param {{title: string, genre: {_id: string, name: string} numberInStock: number, dailyRentalRate: number}} data
 * @returns {Promise<Movie>}
 */
exports.create = async (data) => {
  if (!isValidObjectId(data.genre)) throw error("Invalid Genre Id", 400);

  const genre = await genresService.findByProperty("_id", data.genre);
  if (!genre) throw error("Invalid genre or genre not found", 404);

  const movie = new Movie({
    title: data.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: data.numberInStock,
    dailyRentalRate: data.dailyRentalRate,
  });

  return movie.save();
};

/**
 * ----- Update a Movie -----
 * @param {{title: string, genre: {_id: string, name: string} numberInStock: number, dailyRentalRate: number}} data
 * @returns {Promise<Movie>}
 */
exports.update = async (movieId, data) => {
  if (!isValidObjectId(movieId)) throw error("Invalid Movie Id", 400);
  if (!isValidObjectId(data.genre)) throw error("Invalid Genre Id", 400);

  const genre = await genresService.findByProperty("_id", data.genre);
  if (!genre) throw error("Invalid genre or genre not found", 404);

  const movie = Movie.findByIdAndUpdate(
    movieId,
    {
      title: data.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate,
    },
    { new: true }
  );
  return movie;
};
