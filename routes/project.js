var express = require("express");
var router = express.Router();
var moment = require("moment");

var Project = require("../controllers/project");

/* GET get all projects api */
router.get("/", async function(req, res) {
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
router.get("/:id", async function(req, res) {
  const projects = await Project.findById(req.params.id);
  let result = null;
  if (projects) {
    result = {
      ...projects.dataValues,
      infoCustomField: undefined,
      customField: projects.dataValues.infoCustomField.map(info => {
        return {
          idInfoCustomField: info.dataValues.id,
          value: info.dataValues.name,
          name: info.dataValues.customField.name,
          require: info.dataValues.customField.require
        };
      }),
      start_time: moment(projects.dataValues.start_time).format("x"),
      end_time: moment(projects.dataValues.end_time).format("x"),
      service_detail: JSON.parse(projects.dataValues.service_detail)
    };
  }
  res.json(result);
});

/* GET get all members in project api */
router.get("/membersList/:project_id", async function(req, res) {
  const membersList = await Project.getMembersList(req.params.project_id, res);
  let result = {
    list: [],
    total: 0
  };
  if (membersList) {
    result = membersList.map(member => {
      return {
        ...member.dataValues,
        time_in: moment(member.time_in).format("x"),
        time_out: member.time_out ? moment(member.time_out).format("x") : null
      };
    });
  }
  res.json({
    list: result,
    total: result.length
  });
});

/*POST get all members in project by time_in and time_out */
router.post("/membersList/:project_id", async function(req, res) {
  if (!req.body.time_in && !req.body.time_out) {
    res.status(400).json({
      message: "projects.membersList.message.timeError"
    });
  } else {
    const membersList = await Project.getMembersListByTime(
      req.params.project_id,
      req,
      res
    );
    let result = null;
    if (membersList) {
      result = membersList.map(member => {
        return {
          ...member.dataValues,
          time_in: moment(member.time_in).format("x"),
          time_out: member.time_out ? moment(member.time_out).format("x") : null
        };
      });
    }
    res.json(result);
  }
});

/* POST add new project api */
router.post("/", async function(req, res) {
  const project = await Project.create(req, res);
  if (project) {
    res.json({
      message: "projects.createProject.message.success"
    });
  } else {
    res.status(400).json({
      message: "projects.createProject.message.error"
    });
  }
});

/* POST remove project api */
router.post("/remove/:id", async function(req, res) {
  const result = await Project.remove(req.params.id, res);
  if (!result[0]) {
    res.status(400).json({
      message: "projects.removeProject.message.error"
    });
  } else {
    res.json({
      message: "projects.removeProject.message.success"
    });
  }
});

/* PUT update project api */
router.put("/:id", async function(req, res) {
  const result = await Project.update(req.params.id, req, res);
  if (result) {
    res.json({
      message: "projects.updateProject.message.success"
    });
  } else {
    res.json({
      message: "projects.updateProject.message.error"
    });
  }
});

/* POST add member into project api */
router.post("/membersList", async function(req, res) {
  const result = await Project.addMember(req, res);
  if (result) {
    res.json({
      message: "projects.addMemberIntoProject.message.success"
    });
  } else {
    res.status(400).json({
      message: "projects.addMemberIntoProject.message.error"
    });
  }
});

/* PUT edit member in project api */
router.put("/membersList/:id", async function(req, res) {
  const result = await Project.updateMemberJoined(req.params.id, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "projects.updateMemberIntoProject.message.error"
    });
  } else {
    res.json({
      message: "projects.updateMemberIntoProject.message.success"
    });
  }
});

/* PUT remove member in project api */
router.post("/membersList/remove/:id", async function(req, res) {
  const result = await Project.removeMember(req.params.id, res);
  if (!result[0]) {
    res.status(400).json({
      message: "projects.removeMemberFromProject.message.error"
    });
  } else {
    res.json({
      message: "projects.removeMemberFromProject.message.success"
    });
  }
});

module.exports = router;
