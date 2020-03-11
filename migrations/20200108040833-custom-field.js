"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("custom_fields", {
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
      },
      default_value: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      value_type: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      is_global: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("custom_fields");
  }
};
