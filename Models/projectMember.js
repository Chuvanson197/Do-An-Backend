"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define(
    "ProjectMember",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      member_status: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING
      },
      time_in: {
        allowNull: false,
        type: DataTypes.DATE
      },
      time_out: {
        type: DataTypes.DATE
      },
      effort: {
        allowNull: false,
        type: DataTypes.STRING
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "project_member"
    }
  );
  ProjectMember.associate = function(models) {
    ProjectMember.belongsTo(models.Member, {
      as: "member_detail",
      foreignKey: "staff_code",
      targetKey: "staff_code"
    });
    ProjectMember.belongsTo(models.Project, {
      as: "project_detail",
      foreignKey: "project_id"
    });
  };
  return ProjectMember;
};
