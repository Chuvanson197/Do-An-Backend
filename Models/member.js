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
        type: DataTypes.STRING(100)
      },
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
