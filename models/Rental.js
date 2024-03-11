const { Schema, model } = require("mongoose");

const rentalSchema = new Schema({
  customer: {
    type: new Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        trim: true,
      },
    }),
    required: true,
  },
  movie: {
    type: new Schema({
      title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = model("Rental", rentalSchema);
module.exports = Rental;
