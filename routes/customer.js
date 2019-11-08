var express = require("express");
var router = express.Router();

var Customer = require("../controllers").customer;

/* GET get all customers api */
router.get("/", async function(req, res) {
  const customers = await Customer.findAll();
  res.json(customers);
});

/* GET get customer by customer id api */
router.get("/:id", async function(req, res) {
  const customer = await Customer.findById(req.params.id, res);
  res.json(customer);
});

/* POST add new customer api */
router.post("/", async function(req, res) {
  const customer = await Customer.create(req, res);
  if (customer) {
    res.json({
      message: "customers.createCustomer.message.success"
    });
  } else {
    res.status(400).json({
      message: "customers.createCustomer.message.error"
    });
  }
});

/* POST remove customer api */
router.post("/remove/:id", async function(req, res, next) {
  const result = await Customer.remove(req.params.id, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "customers.removeCustomer.message.error"
    });
  } else {
    res.json({
      message: "customers.removeCustomer.message.success"
    });
  }
});

/* PUT update customer api */
router.put("/:id", async function(req, res, next) {
  const result = await Customer.update(req.params.id, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "customers.updateCustomer.message.error"
    });
  } else {
    res.json({
      message: "customers.updateCustomer.message.success"
    });
  }
});

module.exports = router;
