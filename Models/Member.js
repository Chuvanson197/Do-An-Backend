var db = require("../Dbconnection");

var Member = {
  getALLMember: callback => {
    return db.query("SELECT * FROM members", callback);
  },
  getMemberByStaffCode: (staff_code, callback) => {
    return db.query(
      "SELECT * FROM members WHERE staff_code=?",
      [staff_code],
      callback
    );
  },
  addMember: (member, callback) => {
    return db.query(
      "INSERT INTO members(staff_code,full_name,phone_number,email) values(?,?,?,?)",
      [member.staff_code, member.full_name, member.phone_number, member.email],
      callback
    );
  },
  removeMember: (staff_code, callback) => {
    return db.query(
      "DELETE FROM members WHERE staff_code=?",
      [staff_code],
      callback
    );
  },
  updateMember: (staff_code, member, callback) => {
    return db.query(
      "UPDATE members SET full_name=?,phone_number=?,email=? WHERE staff_code=?",
      [member.full_name, member.phone_number, member.email, staff_code],
      callback
    );
  }
};

module.exports = Member;
