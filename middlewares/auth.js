const jwt = require("jsonwebtoken");
const config = require("config");
const { findByProperty } = require("../services/auth.service");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecretKey"));
    // TODO: comment out again when testing is complete
    const user = await findByProperty("_id", decoded._id);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = auth;
