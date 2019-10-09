var express = require("express");
var router = express.Router();

var Member = require("../controllers").member;

/* GET get all members api */
router.get("/", async function(req, res, next) {
  const members = await Member.findAll();
  res.json(members);
});

/* GET get member by staff code api */
router.get("/:staff_code", async function(req, res, next) {
  const member = await Member.findByStaffCode(req.params.staff_code, res);
  res.json(member);
});

/* POST add new member api */
router.post("/", async function(req, res, next) {
  const member = await Member.create(req, res);
  let result = null;
  if (member) {
    result = member.dataValues;
    delete result.hidden;
  }
  res.json(result);
});

/* POST remove member api */
router.post("/remove/:staff_code", async function(req, res, next) {
  const result = await Member.remove(req.params.staff_code, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Remove member failure"
    });
  } else {
    res.json({
      message: "Remove members successful"
    });
  }
});

/* PUT update member api */
router.put("/:staff_code", async function(req, res, next) {
  const result = await Member.update(req.params.staff_code, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Update failure"
    });
  } else {
    res.json({
      message: "Update successful"
    });
  }
});

module.exports = router;
