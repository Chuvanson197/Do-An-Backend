"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("value_types", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING(50),
        defaultValue: "normal"
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("value_types");
  }
};
