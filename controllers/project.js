var moment = require("moment");
var Sequelize = require("sequelize");

const Op = Sequelize.Op;

const Project = require("../models").Project;
const Customer = require("../models").Customer;
const ProjectMember = require("../models").ProjectMember;
const Member = require("../models").Member;

module.exports = {
  findAll() {
    return Project.findAll({
      attributes: ["id", "name", "status", "start_time", "end_time"],
      where: {
        hidden: 0
      },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "name", "phone_number", "email", "address"]
        }
      ]
    });
  },
  findById(id, res) {
    return Project.findOne({
      attributes: [
        "id",
        "name",
        "status",
        "start_time",
        "end_time",
        "service_detail"
      ],
      where: {
        hidden: 0,
        id
      },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: [
            "id",
            "name",
            "phone_number",
            "email",
            "address",
            "hidden"
          ]
        }
      ]
    }).catch(() =>
      res.status(400).json({
        message: "projects.getProjects.message.error"
      })
    );
  },
  create(req, res) {
    const project = req.body;
    return Project.create({
      ...project,
      start_time: moment(project.start_time).format("YYYY-MM-DDTHH:mm:ss"),
      end_time: project.end_time
        ? moment(project.end_time).format("YYYY-MM-DDTHH:mm:ss")
        : null
    }).catch(() =>
      res.status(400).json({ message: "projects.createProject.message.error" })
    );
  },
  update(id, req, res) {
    const project = req.body;
    return (result = Project.update(
      {
        customer_id: project.customer_id,
        name: project.name,
        status: project.status,
        start_time: moment(project.start_time).format("YYYY-MM-DDTHH:mm:ss"),
        end_time: project.end_time
          ? moment(project.end_time).format("YYYY-MM-DDTHH:mm:ss")
          : null,
        service_detail: JSON.stringify(project.service_detail)
      },
      {
        where: {
          id
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "projects.updateProject.message.error"
      })
    ));
  },
  remove(id, res) {
    return (result = Project.update(
      {
        hidden: 1
      },
      {
        where: {
          id
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "projects.removeProject.message.error"
      })
    ));
  },
  getMembersList(project_id, res) {
    return ProjectMember.findAll({
      attributes: [
        "id",
        "member_status",
        "role",
        "time_in",
        "time_out",
        "effort"
      ],
      where: {
        project_id,
        hidden: 0
      },
      include: [
        {
          model: Member,
          as: "member_detail",
          attributes: ["staff_code", "full_name", "phone_number", "email"],
          where: {
            hidden: 0
          }
        }
      ]
    }).catch(error => {
      console.log(error);

      res.status(400).json({
        message: "projects.getMembersList.message.error"
      });
    });
  },
  getMembersListByTime(project_id, req, res) {
    const time_in = moment(req.body.time_in).format("YYYY-MM-DDTHH:mm:ss");
    const time_out = moment(req.body.time_out).format("YYYY-MM-DDTHH:mm:ss");
    return ProjectMember.findAll({
      attributes: [
        "id",
        "member_status",
        "role",
        "time_in",
        "time_out",
        "effort"
      ],
      where: {
        project_id,
        time_in: {
          [Op.between]: [time_in, time_out]
        }
      },
      include: [
        {
          model: Member,
          as: "member_detail",
          attributes: ["staff_code", "full_name", "phone_number", "email"],
          where: {
            hidden: 0
          }
        }
      ]
    }).catch(() =>
      res.status(400).json({ message: "projects.getMembersList.message.error" })
    );
  },
  addMember(req, res) {
    return ProjectMember.create({
      ...req.body,
      time_in: moment(req.body.time_in).format("YYYY-MM-DDTHH:mm:ss"),
      time_out: req.body.time_out
        ? moment(req.body.time_out).format("YYYY-MM-DDTHH:mm:ss")
        : null
    }).catch(() =>
      res
        .status(400)
        .json({ message: "projects.addMemberIntoProject.message.error" })
    );
  },
  updateMemberJoined(id, req, res) {
    return (result = ProjectMember.update(
      {
        member_status: req.body.member_status,
        role: req.body.role,
        effort: req.body.effort,
        time_in: moment(req.body.time_in).format("YYYY-MM-DDTHH:mm:ss"),
        time_out: req.body.time_out
          ? moment(req.body.time_out).format("YYYY-MM-DDTHH:mm:ss")
          : null
      },
      {
        where: {
          id,
          hidden: 0
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "projects.updateMemberIntoProject.message.error"
      })
    ));
  },
  removeMember(id, res) {
    return (result = ProjectMember.update(
      {
        hidden: 1,
        time_out: moment().format("YYYY-MM-DDTHH:mm:ss"),
        member_status: "leave"
      },
      {
        where: {
          id
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "projects.removeMemberFromProject.message.error"
      })
    ));
  }
};
