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
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          //Required field
          model: 'customers',
          key: 'id'
        }
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
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      service_detail: {
        type: Sequelize.JSON
      },
      hidden: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("projects");

  }
};
