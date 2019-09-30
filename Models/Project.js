db = require("../Dbconnection");
moment = require("moment");

var Project = {
  getAllProject: callback => {
    return db.query("SELECT * FROM projects", callback);
  },
  getProjectById: (id, callback) => {
    return db.query("SELECT * FROM projects WHERE id=?", [id], callback);
  },
  addProject: (project, callback) => {
    return db.query(
      "INSERT INTO projects(customer_id, name, status, start_time, end_time) VALUE (?,?,?,?,?)",
      [
        project.customerId,
        project.name,
        project.status,
        moment(project.start_time).format("YYYY-MM-DDTHH:mm:ss"),
        moment(project.end_time).format("YYYY-MM-DDTHH:mm:ss")
      ],
      callback
    );
  },
  updateProject: (id, project, callback) => {
    return db.query(
      "UPDATE projects SET customer_id=?, name=?, status=?, start_time=?, end_time=?, service_detail=? WHERE id=?",
      [
        project.customerId,
        project.name,
        project.status,
        moment(project.start_time).format("YYYY-MM-DDTHH:mm:ss"),
        moment(project.end_time).format("YYYY-MM-DDTHH:mm:ss"),
        JSON.stringify(project.serviceDetail),
        id
      ],
      callback
    );
  },
  getProjectMembers: (id, callback) => {
    return db.query(
      "SELECT * FROM project_member WHERE project_id=?",
      [id],
      callback
    );
  },
  getProjectMembersHistory: (id, payload, callback) => {
    return db.query(
      "SELECT * FROM project_member WHERE project_id=? AND ( time_in BETWEEN ? AND ? ) AND ( time_out BETWEEN ? AND ? ) ",
      [
        id,
        moment(payload.time_in).format("YYYY-MM-DDTHH:mm:ss"),
        moment(payload.time_out).format("YYYY-MM-DDTHH:mm:ss"),
        moment(payload.time_in).format("YYYY-MM-DDTHH:mm:ss"),
        moment(payload.time_out).format("YYYY-MM-DDTHH:mm:ss"),
      ],
      callback
    );
  },
  addMemberIntoProject: (id, payload, callback) => {
    return db.query(
      "INSERT INTO project_member(project_id, staff_code, member_status, role, time_in, time_out, effort) VALUE (?,?,?,?,?,?,?)",
      [
        id,
        payload.staff_code,
        payload.memberStatus,
        payload.role,
        moment(payload.time_in).format("YYYY-MM-DDTHH:mm:ss"),
        moment(payload.time_out).format("YYYY-MM-DDTHH:mm:ss"),
        payload.effort
      ],
      callback
    );
  },
  editMemberInProject: (id, payload, callback) => {
    return db.query(
      "UPDATE project_member SET member_status=?, role=?, time_in=?, time_out=?, effort=? WHERE project_id=? AND staff_code=?",
      [
        payload.memberStatus,
        payload.role,
        moment(payload.time_in).format("YYYY-MM-DDTHH:mm:ss"),
        moment(payload.time_out).format("YYYY-MM-DDTHH:mm:ss"),
        payload.effort,
        id,
        payload.staff_code
      ],
      callback
    );
  },
  removeMemberFromProject: (id, staff_code, callback) => {
    return db.query(
      "DELETE FROM project_member WHERE project_id=? AND staff_code=?",
      [id, staff_code],
      callback
    );
  }
};

module.exports = Project;
