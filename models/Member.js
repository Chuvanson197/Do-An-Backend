"use strict";
const Sequelize = require("sequelize");

const Member = sequelize.define(
  "Member",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    staff_code: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING(50)
    },
    full_name: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    phone_number: {
      allowNull: true,
      type: Sequelize.STRING(50)
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING(100)
    },
    google_id: {
      allowNull: false,
      type: Sequelize.STRING(255),
    },
    permission: {
      allowNull: false,
      type: Sequelize.STRING(50),
      defaultValue: "view"
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING(50),
      defaultValue: "normal"
    },
    access_token: {
      unique: true,
      type: Sequelize.TEXT
    },
    refresh_token: {
      unique: true,
      type: Sequelize.TEXT
    },
    expires_in: {
      type: Sequelize.DATE,
      allowNull: false
    },
    last_auth: Sequelize.DATE,
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

module.exports = Member;
