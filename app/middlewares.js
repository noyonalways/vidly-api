const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");

/**
 * ---- Middlewares ----
 */
module.exports = [
  process.env.NODE_ENV === "development" ? morgan("dev") : morgan("tiny"),
  cors(),
  express.json(),
  helmet(),
];
