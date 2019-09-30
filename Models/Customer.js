db = require("../Dbconnection");

var Customer = {
  getAllCustomer: callback => {
    return db.query("SELECT * FROM customers", callback);
  },
  getCustomerById: (id, callback) => {
    return db.query("SELECT * FROM customers WHERE id=?", [id], callback);
  },
  addCustomer: (customer, callback) => {
    return db.query(
      "INSERT INTO customers(name, phone_number, email, address) value (?,?,?,?)",
      [customer.name, customer.phoneNumber, customer.email, customer.address],
      callback
    );
  },
  updateCustomer: (id, customer, callback) => {
    return db.query(
      "UPDATE customers SET name=?,phone_number=?,email=?,address=? WHERE id=?",
      [
        customer.name,
        customer.phoneNumber,
        customer.email,
        customer.address,
        id
      ],
      callback
    );
  },
  removeCustomer: (id, callback) => {
    return db.query("DELETE FROM customers WHERE id=?", [id], callback);
  }
};

module.exports = Customer;
