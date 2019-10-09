var express = require("express");
var router = express.Router();
const request = require("request");

/* POST authen api */
router.post("/", function(req, res, next) {
  if (req.body.google_access_token) {
    request.post(
      {
        url: "http://timesheet.impl.vn/api/auth/google",
        form: { token: req.body.google_access_token }
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
