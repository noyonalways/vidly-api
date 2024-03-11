require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
const app = require("./app/app");
const logger = require("./logger");
const config = require("config");

const server = http.createServer(app);
const port = config.get("port") || 3000;

/**
 * ---- DB Connection ----
 */
const db = config.get("dbUri");

mongoose
  .connect(db, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Database connected successfully ✅", db))
  .catch((err) => {
    logger.error(err.message);
    console.log(err);
  });

server.listen(5000, () => {
  console.log(`Welcome to -- ${process.env.APP_NAME}`);
  console.log(`Server is listening on http://localhost:${5000}`);
});

module.exports = server;
