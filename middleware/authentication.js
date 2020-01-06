const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const cookie = require("cookie");

const authentication = (req, res, next) => {
  if (req.headers.cookie && cookie.parse(req.headers.cookie)["access-token"]) {
    let token = cookie.parse(req.headers.cookie)["access-token"];
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        res.status(400).json(err);
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ err: "author" });
  }
};

module.exports = authentication;
