const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

const authentication = (req, res, next) => {
  let cookie = req.headers.cookie;
  if (cookie) {
    let tokenCookie = cookie.split("=")[1];
    jwt.verify(tokenCookie, config.jwtSecret, async (err, decoded) => {
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
