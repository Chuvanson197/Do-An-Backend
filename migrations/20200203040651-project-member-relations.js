"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("project_member_relations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_link_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      member_be_link_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("info_custom_fields");
  }
};
