const winston = require("winston");
require("winston-mongodb");
// const config = require("config");

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      dirname: "logs",
    }),
    // new winston.transports.Console(), // Also log errors to console
    // new winston.transports.MongoDB({
    //   db: config.get("dbUri"),
    // }),
  ],
});
