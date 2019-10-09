"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("project_member", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      time_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      time_out: {
        type: Sequelize.DATE
      },
      effort: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("project_member");
  }
};
