"use strict";
const Sequelize = require("sequelize");

const InfoCustomField = sequelize.define(
  "InfoCustomField",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.TEXT
    },
    project_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    custom_field_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

module.exports = InfoCustomField;
