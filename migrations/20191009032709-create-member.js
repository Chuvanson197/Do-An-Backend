"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("members", {
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
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100)
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
      last_auth: Sequelize.DATE,
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("members");
  }
};
