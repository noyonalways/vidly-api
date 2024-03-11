/**
 * Title: Vidly API Server Application
 * Description: Simple Vidly api sever practice the RESTful api CRUD Operations
 * Author: Noyon Rahman
 * Date: 11-02-2024
 * Contributed by: Noyon Rahman (noyonalways)
 * Email: noyonrahman2003@gmail.com
 * GitHub: https://github.com/noyonalways
 */

/**
 * Endpoints:
 * 1. GET - /api/genres/ To get the list of available genres
 * 2. POST - /api/genres/ Create a new Genres
 * 3. GET - /api/genres/:id  To get a specific Genres from the available Genres
 * 4. PUT - /api/genres/:id To update a Genres from the available Genres
 * 5. DELETE - /api/genres/:id To delete a Genres from the available Genres
 */

require("dotenv").config("../.env");
const config = require("config");
const express = require("express");
const { notFoundHandler, errorHandler } = require("./error");
const middleware = require("./middlewares");
const routes = require("./routes");
const logger = require("../logger");
const app = express();

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  logger.error(ex.message);
});

process.on("unhandledRejection", (ex) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  logger.error(ex.message);
});

if (!config.get("jwtSecretKey")) {
  console.error("FATAL ERROR: jwtSecretKey is not defined.");
  process.exit(1);
}

// throw new Error("Something failed during startup");

/**
 * ----- Middlewares -----
 */
app.use(middleware);

/**
 * ----- All Routes -----
 */
app.use(routes);

/**
 * ----- Error Handler -----
 */
app.use(notFoundHandler); // 404 page
app.use(errorHandler); // global error handler

module.exports = app;
