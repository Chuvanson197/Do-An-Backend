"use strict";
const Sequelize = require("sequelize");
const InfoCustomField = require("./InfoCustomField");

const CustomField = sequelize.define(
  "CustomField",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    require: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

CustomField.hasMany(InfoCustomField, {
  as: "infocustomField",
  foreignKey: "custom_field_id",
  onDelete: "cascade",
  hooks: true
});

InfoCustomField.belongsTo(CustomField, {
  as: "customField",
  foreignKey: "custom_field_id"
});

module.exports = CustomField;
