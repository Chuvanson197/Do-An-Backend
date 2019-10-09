var express = require("express");
var router = express.Router();
var moment = require("moment");

var Project = require("../controllers").project;

/* GET get all projects api */
router.get("/", async function(req, res, next) {
  const projects = await Project.findAll();
  let result = null;
  if (projects) {
    result = projects.map(project => {
      return {
        ...project.dataValues,
        start_time: moment(project.start_time).format("x"),
        end_time: moment(project.end_time).format("x")
      };
    });
  }
  res.json(result);
});

/* GET get project by project id api */
router.get("/:id", async function(req, res, next) {
  const projects = await Project.findById(req.params.id);
  let result = null;
  if (projects) {
    result = {
      ...projects.dataValues,
      start_time: moment(projects.dataValues.start_time).format("x"),
      end_time: moment(projects.dataValues.end_time).format("x"),
      service_detail: JSON.parse(projects.dataValues.service_detail)
    };
  }
  res.json(result);
});

/* GET get all members in project api */
router.get("/membersList/:project_id", async function(req, res, next) {
  const membersList = await Project.getMembersList(req.params.project_id, res);
  let result = null;
  if (membersList) {
    result = membersList.map(member => {
      return {
        ...member.dataValues,
        time_in: moment(member.time_in).format("x"),
        time_out: moment(member.time_out).format("x")
      };
    });
  }
  res.json(result);
});

/* POST add new project api */
router.post("/", async function(req, res, next) {
  const project = await Project.create(req, res);
  let result = null;
  if (project) {
    result = {
      ...project.dataValues,
      start_time: moment(project.start_time).format("x"),
      end_time: moment(project.end_time).format("x")
    };
    delete result.hidden;
  }
  res.json(result);
});

/* POST remove project api */
router.post("/remove/:id", async function(req, res, next) {
  const result = await Project.remove(req.params.id, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Remove project failure"
    });
  } else {
    res.json({
      message: "Remove project successful"
    });
  }
});

/* PUT update project api */
router.put("/:id", async function(req, res, next) {
  const result = await Project.update(req.params.id, req, res);
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

/* POST add member into project api */
router.post("/membersList", async function(req, res, next) {
  const project = await Project.addMember(req, res);
  let result = project.dataValues;
  delete result.hidden;
  res.json(result);
});

/* PUT edit member in project api */
router.put("/membersList/:id", async function(req, res, next) {
  const result = await Project.updateMemberJoined(req.params.id, req, res);
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

/* PUT edit member in project api */
router.post("/membersList/remove/:id", async function(req, res, next) {
  const result = await Project.removeMember(req.params.id, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Remove member failure"
    });
  } else {
    res.json({
      message: "Remove member successful"
    });
  }
});

module.exports = router;
