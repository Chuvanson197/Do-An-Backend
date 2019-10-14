const Member = require("../models").Member;

module.exports = {
  findAll() {
    return Member.findAll({
      attributes: ["staff_code", "full_name", "phone_number", "email"],
      where: {
        hidden: 0
      }
    });
  },
  findByStaffCode(staff_code, res) {
    return Member.findOne({
      attributes: ["staff_code", "full_name", "phone_number", "email"],
      where: {
        staff_code,
        hidden: 0
      }
    }).catch(() =>
      res.status(400).json({
        message: "members.findMember.message.error"
      })
    );
  },
  create(req, res) {
    return Member.create({
      ...req.body
    }).catch(() => {
      res.status(400).json({
        message: "members.addMember.message.error"
      });
    });
  },
  update(staff_code, req, res) {
    const member = req.body;
    return (result = Member.update(
      {
        full_name: member.full_name,
        phone_number: member.phone_number,
        email: member.email
      },
      {
        where: {
          staff_code,
          hidden: 0
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "members.updateMember.message.error"
      })
    ));
  },
  remove(staff_code, req, res) {
    return (result = Member.update(
      {
        hidden: 1
      },
      {
        where: {
          staff_code
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "members.removeMember.message.error"
      })
    ));
  }
};
