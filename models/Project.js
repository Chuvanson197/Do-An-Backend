"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(150)
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      start_time: {
        allowNull: false,
        type: DataTypes.DATE
      },
      end_time: {
        type: DataTypes.DATE
      },
      service_detail: {
        type: DataTypes.JSON
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "projects"
    }
  );
  Project.associate = function(models) {
    Project.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: "customer_id"
    });
  };
  return Project;
};
