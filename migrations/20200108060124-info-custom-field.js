"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("info_custom_fields", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "projects",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      custom_field_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "custom_fields",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("info_custom_fields");
  }
};
