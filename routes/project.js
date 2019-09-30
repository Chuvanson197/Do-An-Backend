var express = require("express");
var router = express.Router();
const passport = require("passport");
var moment = require("moment");

var Project = require("../Models/Project");
var Customer = require("../Models/Customer");
var Member = require("../Models/Member");

router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Project.getAllProject((err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      let _result = result.map(e => {
        return {
          ...e,
          start_time: moment(e.start_time).format("x"),
          end_time: moment(e.end_time).format("x"),
          service_detail: e.service_detail ? JSON.parse(e.service_detail) : {}
        };
      });
      res.json(_result);
    }
  });
});

/* GET get project by id. */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function(req, res, next) {
    await Project.getProjectById(req.params.id, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else if (result.length) {
        Customer.getCustomerById(result[0].customer_id, (err2, result2) => {
          if (err2) {
            res.status(400).json(err);
          } else if (result2.length) {
            let _result = {
              ...result[0],
              start_time: moment(result[0].start_time).format("x"),
              end_time: moment(result[0].end_time).format("x"),
              service_detail: result[0].service_detail
                ? JSON.parse(result[0].service_detail)
                : {},
              customer: {
                ...result2[0]
              }
            };
            res.json(_result);
          } else {
            res.status(400).json({
              msg: "customer information isn't exist"
            });
          }
        });
      } else {
        res.status(400).json({
          msg: "Project isn't exist"
        });
      }
    });
  }
);

/* POST add new project */
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Project.addProject(req.body, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.body);
    }
  });
});

/* PUT update project */
router.put("/:id", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Project.updateProject(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.body);
    }
  });
});

/* GET project members */
router.get(
  "/_members/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Project.getProjectMembers(req.params.id, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else if (result.length) {
        let _result = result.map(e => {
          return {
            ...e,
            time_in: moment(e.time_in).format("x"),
            time_out: moment(e.time_out).format("x")
          };
        });
        res.json(_result);
      } else {
        res.json([]);
      }
    });
  }
);

/* POST project members history by time_in and time_out */
router.post(
  "/_members/history/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Project.getProjectMembersHistory(
      req.params.id,
      req.body,
      (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else if (result.length) {
          let _result = result.map(e => {
            return {
              ...e,
              time_in: moment(e.time_in).format("x"),
              time_out: moment(e.time_out).format("x")
            };
          });
          res.json(_result);
        } else {
          res.json([]);
        }
      }
    );
  }
);

/*POST add member into project */
router.post(
  "/_members/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Project.addMemberIntoProject(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({
          msg: "Add member into project success"
        });
      }
    });
  }
);

/*PUT edit member in project information*/
router.put(
  "/_members/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Project.editMemberInProject(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({
          msg: "Edit member in project information success!"
        });
      }
    });
  }
);

/*POST remove member from project */
router.post(
  "/_members/remove/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Project.removeMemberFromProject(req.params.id, req.body.staff_code, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({
          msg: "Remove member success"
        });
      }
    });
  }
);

module.exports = router;
