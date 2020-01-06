const Member = require("../models/Member");

module.exports = {
  findAll() {
    return Member.findAll({
      attributes: [
        "staff_code",
        "full_name",
        "phone_number",
        "email",
        "type",
        "permission"
      ],
      where: {
        hidden: 0
      }
    });
  },
  findById(id) {
    return Member.findOne({
      attributes: ["id", "email", "last_auth", "access_token", "refresh_token"],
      where: {
        id,
        hidden: 0
      }
    }).catch(() => {
      return null;
    });
  },
  findByEmail(email) {
    return Member.findOne({
      attributes: [
        "id",
        "refresh_token",
        "staff_code",
        "full_name",
        "phone_number",
        "email",
        "type"
      ],
      where: {
        email,
        hidden: 0
      }
    }).catch(() => {
      return null;
    });
  },
  findByToken: token => {
    return Member.findOne({
      where: {
        access_token: token,
        hidden: 0
      }
    });
  },
  findByStaffCode(staff_code, res) {
    return Member.findOne({
      attributes: [
        "staff_code",
        "full_name",
        "phone_number",
        "email",
        "type",
        "permission"
      ],
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
      ...req.body,
      staff_code: req.body.staff_code.toUpperCase()
    }).catch(error => {
      if (error.original.code === "ER_DUP_ENTRY") {
        res.status(400).json({
          message: "members.addMember.message.staff_code.exits"
        });
      } else {
        res.status(400).json({
          message: "members.addMember.message.error"
        });
      }
    });
  },
  update(staff_code, req, res) {
    const member = req.body;
    return (result = Member.update(
      {
        full_name: member.full_name,
        phone_number: member.phone_number,
        email: member.email,
        type: member.type,
        permission: member.permission
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

  addNewMember: async (user, authToken, expires_in, last_auth) => {
    return await Member.create({
      full_name: user["name"] || "",
      email: user["email"],
      staff_code: `${Math.random()}`,
      phone_number: `${Math.random()}`,
      access_token: authToken.access_token,
      refresh_token: authToken.refresh_token,
      expires_in,
      last_auth
    });
  },
  savingToken(email, data, res) {
    return Member.update(
      {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        last_auth: data.last_auth
      },
      {
        where: {
          email,
          hidden: 0
        }
      }
    ).catch(error => {
      res.send(error);
    });
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
