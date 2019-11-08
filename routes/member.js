var express = require("express");
var router = express.Router();

var Member = require("../controllers").member;
const authencation = require("../utils/authencation");

/* GET get all members api */
router.get("/", authencation.isAuthenticated, async function(req, res) {
  const members = await Member.findAll();
  res.json(members);
});

/* GET get member by staff code api */
router.get("/:staff_code", async function(req, res) {
  const member = await Member.findByStaffCode(req.params.staff_code, res);
  res.json(member);
});

/* POST add new member api */
router.post("/", async function(req, res) {
  const member = await Member.create(req, res);
  if (member) {
    res.json({
      message: "members.addMember.message.success"
    });
  } else {
    res.status(400).json({
      message: "members.addMember.message.error"
    });
  }
});

/* POST remove member api */
router.post("/remove/:staff_code", async function(req, res) {
  const result = await Member.remove(req.params.staff_code, res);
  if (!result[0]) {
    res.status(400).json({
      message: "members.removeMember.message.error"
    });
  } else {
    res.json({
      message: "members.removeMember.message.success"
    });
  }
});

/* PUT update member api */
router.put("/:staff_code", async function(req, res) {
  const result = await Member.update(req.params.staff_code, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "members.updateMember.message.error"
    });
  } else {
    res.json({
      message: "members.updateMember.message.success"
    });
  }
});

module.exports = router;
