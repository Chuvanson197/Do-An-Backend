"use strict";
const Sequelize = require("sequelize");

const ProjectMemberRelations = sequelize.define(
  "ProjectMemberRelations",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    member_link_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    member_be_link_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

module.exports = ProjectMemberRelations;
