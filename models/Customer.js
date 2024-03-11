const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 30,
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
    maxLength: 20,
    trim: true,
  },
});

const Customer = model("Customer", customerSchema);
module.exports = Customer;
