"use strict";
const Sequelize = require("sequelize");

const ValueType = sequelize.define(
    "ValueType",
    {
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
        }
    },
    {
        timestamps: false,
        underscored: true
    }
);

module.exports = ValueType;
