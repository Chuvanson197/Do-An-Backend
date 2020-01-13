"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("project_members", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          //Required field
          model: "projects",
          key: "id"
        }
      },
      staff_code: {
        allowNull: false,
        type: Sequelize.STRING(100),
        references: {
          //Required field
          model: "members",
          key: "staff_code"
        }
      },
      member_status: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      time_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      time_out: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      effort: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("project_members");
  }
};
