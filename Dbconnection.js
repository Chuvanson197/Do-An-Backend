var mysql = require("mysql");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "19022018",
  database: "project_management",
  insecureAuth : true
});

module.exports=connection;
