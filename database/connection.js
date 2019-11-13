var Sequelize = require("sequelize");

var sequelize = new Sequelize("project_management", "root", "namnguyen691997", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
global.sequelize = sequelize;
