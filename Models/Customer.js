"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
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
      address: {
        allowNull: false,
        type: DataTypes.STRING(500)
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      }
    },
    { timestamps: false, underscored: true, tableName: "customers" }
  );
  Customer.associate = function(models) {};
  return Customer;
};
