"use strict";
const Sequelize = require("sequelize");
const Customer = sequelize.define(
  "Customer",
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
    phone_number: {
      allowNull: false,
      type: Sequelize.STRING(50)
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING(500)
    },
    hidden: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }
  },
  { timestamps: false, underscored: true, tableName: "customers" }
);

module.exports = Customer;
