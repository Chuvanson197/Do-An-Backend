var express = require("express");
var router = express.Router();
var request = require("request");
var jwt = require("jsonwebtoken");
const moment = require("moment");

var config = require("../config/authConfig");
const Env = require("../utils/environment");

var Member = require("../controllers").member;

/* POST login api */
router.post("/login", function(req, res) {
  let { accessCode } = req.body;

  if (!accessCode) {
    res.status(401).json({
      message: "Access code is required"
    });
  }
  request.post(
    {
      url: Env.OAuth,
      form: {
        grant_type: config.grant_type,
        client_id: config.client_id,
        client_secret: config.clientSecret,
        redirect_uri: config.redirect_uri,
        code: accessCode
      }
    },
    function(error, httpResponse, body) {
      if (error || httpResponse.statusCode === 400) {
        res.status(401).json({ message: "Unauthorized user!" });
      } else {
        let authData = JSON.parse(body);

        request(
          {
            url: Env,
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
            let token = jwt.sign(
              { ...userData, ...authData },
              config.jwtSecret,
              { expiresIn: "1h" }
            );

            const memberId = await Member.findByEmail(userData.email);
            if (!memberId) {
              await Member.addNewMember(
                userData,
                { ...authData, access_token: token },
                moment()
                  .add(1, "hours")
                  .format("YYYY-MM-DDTHH:mm:ss"),
                moment().format("YYYY-MM-DDTHH:mm:ss")
              );
            } else {
              await Member.savingToken(
                userData.email,
                {
                  access_token: token,
                  refresh_token: authData.refresh_token,
                  expires_in: moment()
                    .add(1, "hours")
                    .format("YYYY-MM-DDTHH:mm:ss"),
                  last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
                },
                res
              );
            }
            res.json({
              access_token: token
            });
            // handle saving access_token

            // Encrypt user data
          }
        );
      }
    }
  );
});

router.get("/refreshLogin", (req, res) => {
  let cookie = req.headers.cookie;
  if (cookie) {
    let tokenCookie = cookie.split("=")[1];
    jwt.verify(tokenCookie, config.jwtSecret, async (err, decoded) => {
      if (err && err.name === "JsonWebTokenError") {
        res.json({ statusCode: 400 });
      } else if (err && err.name === "TokenExpiredError") {
        let memeberWithEmail = await Member.findByEmail(decoded.email);
        request.post(
          {
            url: Env.OAuth,
            form: {
              grant_type: "refresh_token",
              client_id: config.client_id,
              client_secret: config.clientSecret,
              refresh_token: memeberWithEmail.dataValues.refresh_token,
              scope: "user-info"
            }
          },
          async function(error, httpResponse, body) {
            if (error || httpResponse.statusCode === 400) {
              res.json({ statusCode: 400 });
            } else {
              let authRefreshToken = JSON.parse(body);
              let token = jwt.sign(
                { ...memeberWithEmail.dataValues },
                config.jwtSecret,
                {
                  expiresIn: config.expiresIn
                }
              );

              await Member.savingToken(
                memeberWithEmail.dataValues.email,
                {
                  access_token: token,
                  refresh_token: authRefreshToken.refresh_token,
                  expires_in: moment()
                    .add(1, "hours")
                    .format("YYYY-MM-DDTHH:mm:ss"),
                  last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
                },
                res
              );
              res.json({ statusCode: 200, access_token: token });
            }
          }
        );
      } else {
        res.json({ statusCode: 1000, token: cookie });
      }
    });
  } else {
    res.json({ statusCode: 400 });
  }
});

router.get("/refreshToken", (req, res) => {
  let cookie = req.headers.cookie;
  if (cookie) {
    let tokenCookie = cookie.split("=")[1];
    jwt.verify(tokenCookie, config.jwtSecret, async (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        let refresh_token = await Member.findByToken(tokenCookie);
        request.post(
          {
            url: Env.OAuth,
            form: {
              grant_type: "refresh_token",
              client_id: config.client_id,
              client_secret: config.clientSecret,
              refresh_token: refresh_token.dataValues.refresh_token,
              scope: "user-info"
            }
          },
          async function(error, httpResponse, body) {
            if (error || httpResponse.statusCode === 400) {
              res.json({ statusCode: 400 });
            } else {
              let authRefreshToken = JSON.parse(body);
              let token = jwt.sign(
                { ...refresh_token.dataValues },
                config.jwtSecret,
                {
                  expiresIn: config.expiresIn
                }
              );

              await Member.savingToken(
                refresh_token.dataValues.email,
                {
                  access_token: token,
                  refresh_token: authRefreshToken.refresh_token,
                  expires_in: moment()
                    .add(1, "hours")
                    .format("YYYY-MM-DDTHH:mm:ss"),
                  last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
                },
                res
              );
              res.json({ statusCode: 200, access_token: token });
            }
          }
        );
      } else {
        res.json({ statusCode: 400 });
      }
    });
  } else {
    res.json({ statusCode: 400 });
  }
});

module.exports = router;
