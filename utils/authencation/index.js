var Member = require("../../controllers").member;
var config = require("../../config/authConfig");
var jwt = require("jsonwebtoken");
var moment = require("moment");

var refreshToken = require("./refresh");

exports.isAuthenticated = function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    var jwtToken = req.headers.authorization.split(" ")[1];
    jwt.verify(jwtToken, config.jwtSecret, async function(err, payload) {
      if (err) {
        res.status(401).json({ message: "Unauthorized user!" });
      } else {
        const member = await Member.findById(payload.id);
        if (member.dataValues) {
          const memberData = member.dataValues;
          let duration = moment
            .duration(moment().diff(moment(memberData.last_auth)))
            .asHours();
          if (duration >= 60) {
            refreshToken(
              memberData.email,
              memberData.refresh_token,
              res,
              result => {
                if (!result) {
                  res.status(401).json({
                    message: "Unauthorized user!"
                  });
                }
              }
            );
          } else {
            next();
          }
        } else {
          res.status(401).json({ message: "Unauthorized user!" });
        }
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};
