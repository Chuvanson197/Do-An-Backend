var express = require("express");
var router = express.Router();
var cors = require("cors");

const corsOptions = require("../config/corsOptions");
var Member = require("../controllers").member;

/* GET get all members api */
router.get("/", cors(corsOptions), async function(req, res, next) {
  const members = await Member.findAll();
  res.json(members);
});

/* GET get member by staff code api */
router.get("/:staff_code", cors(corsOptions), async function(req, res, next) {
  const member = await Member.findByStaffCode(req.params.staff_code, res);
  res.json(member);
});

/* POST add new member api */
router.post("/", cors(corsOptions), async function(req, res, next) {
  const member = await Member.create(req, res);
  let result = null;
  if (member) {
    res.json({
      message: "Add new member information successful"
    });
  } else {
    res.status(400).json({
      message: "Add new member information successful"
    });
  }
});

/* POST remove member api */
router.post("/remove/:staff_code", cors(corsOptions), async function(
  req,
  res,
  next
) {
  const result = await Member.remove(req.params.staff_code, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Remove member information failure"
    });
  } else {
    res.json({
      message: "Remove member information successful"
    });
  }
});

/* PUT update member api */
router.put("/:staff_code", cors(corsOptions), async function(req, res, next) {
  const result = await Member.update(req.params.staff_code, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Update member information failure"
    });
  } else {
    res.json({
      message: "Update member information successful"
    });
  }
});

module.exports = router;
