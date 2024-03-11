const { Schema, model } = require("mongoose");

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
});

const Genre = model("Genre", genreSchema);

exports.Genre = Genre;
exports.genreSchema = genreSchema;
