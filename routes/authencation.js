var express = require("express");
var router = express.Router();
var request = require("request");
var cors = require("cors");

const corsOptions = require("../config/corsOptions");

/* POST authen api */
router.post("/", cors(corsOptions), function(req, res, next) {
  if (req.body.googleAccessToken) {
    request.post(
      {
        url: "http://timesheet.impl.vn/api/auth/google",
        form: { token: req.body.googleAccessToken }
      },
      function(error, httpResponse, body) {
        if (error) {
          res.status(401).json({
            msg: "Unauthorized, access denied"
          });
        } else {
          res.json(JSON.parse(body));
        }
      }
    );
  } else {
    res.status(401).json({
      msg: "Invalid google access token!"
    });
  }
});

module.exports = router;
