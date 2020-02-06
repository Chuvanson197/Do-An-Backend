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
      project_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      member_link_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      member_be_link_id: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("info_custom_fields");
  }
};
