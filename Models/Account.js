var db = require("../Dbconnection");

var Account = {
  getALLAccount: callback => {
    return db.query("SELECT * FROM accounts", callback);
  },
  getAccountById: (id, callback) => {
    return db.query(
      "SELECT * FROM accounts WHERE id=? LIMIT 1",
      [id],
      callback
    );
  },
  getAccountByUsername: (username, callback) => {
    return db.query(
      "SELECT * FROM accounts WHERE username=? LIMIT 1",
      [username],
      callback
    );
  },
  addAccount: (account, callback) => {
    return db.query(
      "INSERT INTO accounts(username,password,email) values(?,?,?)",
      [account.username, account.password, account.email],
      callback
    );
  },
  removeAccount: (username, callback) => {
    return db.query(
      "DELETE FROM accounts WHERE username=?",
      [username],
      callback
    );
  },
  updateAccountInfo: (username, account, callback) => {
    return db.query(
      "UPDATE accounts SET email=? WHERE username=?",
      [account.email, username],
      callback
    );
  }
};

module.exports = Account;
