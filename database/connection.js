var Sequelize = require("sequelize");
const Env = require("../utils/environment");

var sequelize = new Sequelize(Env.DB_NAME, Env.root, Env.password, {
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
