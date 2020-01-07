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
        type: Sequelize.TEXT
      },
      refresh_token: {
        type: Sequelize.TEXT
      },
      expires_in: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      last_auth: {
        defaultValue: null,
        type: Sequelize.DATE,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("members");
  }
};
