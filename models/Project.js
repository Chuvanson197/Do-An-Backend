"use strict";
const Sequelize = require("sequelize");
const Customer = require("./Customer");
const InfoCustomField = require("./InfoCustomField");

const Project = sequelize.define(
  "Project",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    customer_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(150)
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    start_time: {
      allowNull: false,
      type: Sequelize.DATE
    },
    end_time: {
      type: Sequelize.DATE
    },
    service_detail: {
      type: Sequelize.JSON
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

Project.belongsTo(Customer, {
  as: "customer",
  foreignKey: "customer_id"
});
Project.hasMany(InfoCustomField, {
  as: "infoCustomField",
  foreignKey: "project_id"
});

InfoCustomField.belongsTo(Project, {
  as: "project",
  foreignKey: "project_id"
});

module.exports = Project;
