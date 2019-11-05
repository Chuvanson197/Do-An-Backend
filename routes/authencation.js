var express = require("express");
var router = express.Router();
var request = require("request");
var cors = require("cors");
var jwt = require("jsonwebtoken");
const moment = require("moment");

var config = require("../config/authConfig");

const corsOptions = require("../config/corsOptions");
var Member = require("../controllers").member;

/* POST login api */
router.post("/login", cors(corsOptions), function(req, res, next) {
  if (!req.body.accessCode) {
    res.status(401).json({
      message: "Access code is required"
    });
  }
  request.post(
    {
      url: "http://auth.impl.vn/oauth/token",
      form: {
        grant_type: config.grant_type,
        client_id: config.client_id,
        client_secret: config.clientSecret,
        redirect_uri: config.redirect_uri,
        code: req.body.accessCode
      }
    },
    function(error, httpResponse, body) {
      if (error || httpResponse.statusCode === 400) {
        res.status(401).json({ message: "Unauthorized user!" });
      } else {
        let authData = JSON.parse(body);
        request(
          {
            url: "http://auth.impl.vn/api/user-info",
            headers: {
              Authorization: `${authData.token_type} ${authData.access_token}`
            }
          },
          async function(error, httpResponse, user) {
            if (error) {
              res.status(401).json({
                message: "Unauthorized user!"
              });
            }
            let userData = JSON.parse(user);
            const memberId = await Member.findByEmail(userData.email);
            if (!memberId.dataValues) {
              res.status(401).json({
                message: "Unauthorized user!"
              });
            }
            // handle saving access_token
            await Member.savingToken(
              userData.email,
              {
                access_token: authData.access_token,
                refresh_token: authData.refresh_token,
                last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
              },
              res
            );
            // Encrypt user data
            var token = jwt.sign(memberId.dataValues, config.jwtSecret);
            res.json({
              access_token: token
            });
          }
        );
      }
    }
  );
});

module.exports = router;
