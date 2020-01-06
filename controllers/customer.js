const Customer = require("../models/Customer");
module.exports = {
  findAll() {
    return Customer.findAll({
      attributes: ["id", "name", "phone_number", "email", "address", "hidden"],
      where: {
        hidden: 0
      }
    });
  },
  findById(id, res) {
    return Customer.findOne({
      attributes: ["id", "name", "phone_number", "email", "address"],
      where: {
        id,
        hidden: 0
      }
    }).catch(() =>
      res.status(400).json({
        message: "customers.getCustomer.message.error"
      })
    );
  },
  create(req, res) {
    return Customer.create({
      ...req.body
    }).catch(() =>
      res.status(400).json({
        message: "customers.createCustomer.message.error"
      })
    );
  },
  update(id, req, res) {
    const customer = req.body;
    return (result = Customer.update(
      {
        name: customer.name,
        phone_number: customer.phone_number,
        email: customer.email,
        address: customer.address
      },
      {
        where: {
          id,
          hidden: 0
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "customers.updateCustomer.message.error"
      })
    ));
  },
  remove(id, res) {
    return (result = Customer.update(
      {
        hidden: 1
      },
      {
        where: {
          id
        }
      }
    ).catch(() =>
      res.status(400).json({
        message: "customers.removeCustomer.message.error"
      })
    ));
  }
};
