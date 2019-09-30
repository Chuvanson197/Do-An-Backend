var express = require("express");
var router = express.Router();
var Member = require("../Models/Member");
const passport = require("passport");

router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Member.getALLMember((err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

/* GET get member by staff_code. */
router.get("/:staff_code", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Member.getMemberByStaffCode(req.params.staff_code, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

/* POST add new member */
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Member.addMember(req.body, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.body);
    }
  });
});

/* PUT update member */
router.put("/:staff_code", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Member.updateMember(req.params.staff_code, req.body, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;
