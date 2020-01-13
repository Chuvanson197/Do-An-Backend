var Sequelize = require("sequelize");
const Env = require("../utils/environment");

var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci"
      }
    }
  }
);

module.exports = sequelize;
global.sequelize = sequelize;
