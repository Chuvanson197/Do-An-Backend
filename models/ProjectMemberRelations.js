"use strict";
const Sequelize = require("sequelize");

const ProjectMemberRelation = sequelize.define(
  "ProjectMemberRelations",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    project_id: {
      allowNull: false,
      type: Sequelize.STRING
    },
    role_link: {
      allowNull: false,
      type: Sequelize.STRING
    },
    member_link_id: {
      allowNull: false,
      type: Sequelize.STRING
    },
    member_be_link_id: {
      allowNull: false,
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

module.exports = ProjectMemberRelation;
