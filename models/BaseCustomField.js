"use strict";
const Sequelize = require("sequelize");

const BaseCustomField = sequelize.define(
    "BaseCustomField",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING(100)
        },
        require: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        default_value: {
            allowNull: false,
            type: Sequelize.STRING(100)
        },
        value_type: {
            allowNull: false,
            type: Sequelize.STRING(100)
        }
    },
    {
        timestamps: false,
        underscored: true
    }
);

module.exports = BaseCustomField;
