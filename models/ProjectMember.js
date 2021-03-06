"use strict";
const Sequelize = require("sequelize");
const Member = require("./Member");
const Project = require("./Project");

const ProjectMember = sequelize.define(
  "ProjectMember",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    project_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    staff_code: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    member_status: {
      allowNull: false,
      type: Sequelize.STRING
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING
    },
    time_in: {
      allowNull: false,
      type: Sequelize.DATE
    },
    time_out: {
      type: Sequelize.DATE
    },
    effort: {
      allowNull: false,
      type: Sequelize.STRING
    },
    hidden: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);
ProjectMember.belongsTo(Member, {
  as: "member_detail",
  foreignKey: "staff_code",
  targetKey: "staff_code"
});

module.exports = ProjectMember;
