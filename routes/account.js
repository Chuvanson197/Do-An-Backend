var express = require("express");
var router = express.Router();
var Account = require("../Models/Account");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey =
  "asdfbasidfbaosdfasofdasofbasfsuhfvasldfhsapdfasvfafgad";

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  Account.getAccountById(jwt_payload.id, (err, result) => {
    if (result.length) {
      next(null, result);
    } else {
      next(null, false);
    }
  });
});
// use the strategy
passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.post("/login", function(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    Account.getAccountByUsername(username, (err, result) => {
      if (err) {
        res.status(400).json({
          msg: err
        });
      } else if (!result.length) {
        res.status(400).json({
          msg: "No such account found"
        });
      } else {
        if (result[0].password === password) {
          var payload = {
            id: result[0].id
          };
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ msg: "ok", token: token });
        } else {
          res.status(400).json({ msg: "Password is incorrect" });
        }
      }
    });
  } else {
    res.status(400).json({ msg: "Username & password is required" });
  }
});

router.post("/register", function(req, res, next) {
  const { username, password, email } = req.body;
  if (username && password && email) {
    Account.addAccount(req.body, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({
          msg: "Create account success"
        });
      }
    });
  } else {
    res.status(400).json({
      msg: "Username, password or email is required"
    });
  }
});

module.exports = router;
