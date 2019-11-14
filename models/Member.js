"use strict";
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "Member",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      staff_code: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(50)
      },
      full_name: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      phone_number: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100)
      },
      permission: {
        allowNull: false,
        type: DataTypes.STRING(50),
        defaultValue: "view"
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING(50),
        defaultValue: "normal"
      },
      access_token: {
        unique: true,
        type: DataTypes.TEXT
      },
      refresh_token: {
        unique: true,
        type: DataTypes.TEXT
      },
      expires_in: {
        type: DataTypes.DATE,
        allowNull: false
      },
      last_auth: DataTypes.DATE,
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "members"
    }
  );
  Member.associate = function(models) {};
  return Member;
};
