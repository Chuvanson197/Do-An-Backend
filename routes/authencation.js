var express = require("express");
var router = express.Router();
var request = require("request");
var jwt = require("jsonwebtoken");
const moment = require("moment");
const cookie = require("cookie");

const Env = require("../utils/environment");

var Member = require("../controllers/member");

/* POST login api */
router.post("/login", async function(req, res) {
  const userData = req.body;
  
  // for (const key in userData.accessCode) {
  //   console.log(key, userData.accessCode[key]);
  // }
  const profileObj = userData.accessCode.profileObj;
  const googleId = userData.accessCode.googleId;
  const {email, name} = profileObj;
  
  let member = await Member.findByEmail(email);
  if(!member){
    member = await Member.addNewMember(
      {email, name, google_id: googleId},
      {access_token: '', refresh_token: '' },
      moment()
        .add(1, "hours")
        .format("YYYY-MM-DDTHH:mm:ss"),
      moment().format("YYYY-MM-DDTHH:mm:ss")
    );
  }
  console.log('member', member);
  if(member.google_id !== googleId){
    return res.status(401).json({
      message: "Access code is required"
    });
  }
  token = jwt.sign(
    { ...member.dataValues, access_token: "", refresh_token: "",  },
    Env.jwtSecret,
    {
      expiresIn: Env.expiresIn
    }
  );
  await Member.savingToken(
    email,
    {
      access_token: token,
      refresh_token: '',
      expires_in: moment()
        .add(1, "hours")
        .format("YYYY-MM-DDTHH:mm:ss"),
      last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
    },
    res
  );
  res.json({
    access_token: token
  });


});

router.get("/refreshLogin", (req, res) => {
  if (req.headers.cookie && cookie.parse(req.headers.cookie)["access-token"]) {
    let token = cookie.parse(req.headers.cookie)["access-token"];
    jwt.verify(token, Env.jwtSecret, async (err, decoded) => {
      if (err && err.name === "JsonWebTokenError") {
        res.json({ statusCode: 400 });
      } else if (err && err.name === "TokenExpiredError") {
        let memeberWithToken = await Member.findByToken(token);
        request.post(
          {
            url: Env.OAuth,
            form: {
              grant_type: "refresh_token",
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              refresh_token: memeberWithToken.dataValues.refresh_token,
              scope: "user-info"
            }
          },
          async function(error, httpResponse, body) {
            if (error || httpResponse.statusCode === 400) {
              res.json({ statusCode: 400 });
            } else {
              let authRefreshToken = JSON.parse(body);
              let newToken = jwt.sign(
                {
                  ...memeberWithToken.dataValues,
                  access_token: "",
                  refresh_token: ""
                },
                Env.jwtSecret,
                {
                  expiresIn: Env.expiresIn
                }
              );

              await Member.savingToken(
                memeberWithToken.dataValues.email,
                {
                  access_token: newToken,
                  refresh_token: authRefreshToken.refresh_token,
                  expires_in: moment()
                    .add(1, "hours")
                    .format("YYYY-MM-DDTHH:mm:ss"),
                  last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
                },
                res
              );
              res.json({ statusCode: 200, access_token: newToken });
            }
          }
        );
      } else {
        res.json({ statusCode: 1000, access_token: token });
      }
    });
  } else {
    res.json({ statusCode: 400 });
  }
});

router.get("/refreshToken", (req, res) => {
  if (req.headers.cookie && cookie.parse(req.headers.cookie)["access-token"]) {
    let token = cookie.parse(req.headers.cookie)["access-token"];
    jwt.verify(token, Env.jwtSecret, async (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        let refresh_token = await Member.findByToken(token);
        request.post(
          {
            url: Env.OAuth,
            form: {
              grant_type: "refresh_token",
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              refresh_token: refresh_token.dataValues.refresh_token,
              scope: "user-info"
            }
          },
          async function(error, httpResponse, body) {
            if (error || httpResponse.statusCode === 400) {
              res.json({ statusCode: 400 });
            } else {
              let authRefreshToken = JSON.parse(body);
              let newToken = jwt.sign(
                {
                  ...refresh_token.dataValues,
                  access_token: "",
                  refresh_token: ""
                },
                Env.jwtSecret,
                {
                  expiresIn: Env.expiresIn
                }
              );

              await Member.savingToken(
                refresh_token.dataValues.email,
                {
                  access_token: newToken,
                  refresh_token: authRefreshToken.refresh_token,
                  expires_in: moment()
                    .add(1, "hours")
                    .format("YYYY-MM-DDTHH:mm:ss"),
                  last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
                },
                res
              );
              res.json({ statusCode: 200, access_token: newToken });
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

router.post("/logout", async (req, res) => {
  const userLogout = await Member.logout(req.body);
  if (userLogout) {
    res.json({ status: 200 });
  } else {
    res.json({ status: 400 });
  }
});

module.exports = router;
