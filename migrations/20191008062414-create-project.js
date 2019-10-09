"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("projects");
  }
};
