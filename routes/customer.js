var express = require("express");
var router = express.Router();
var cors = require("cors");

const corsOptions = require("../config/corsOptions");
var Customer = require("../controllers").customer;

/* GET get all customers api */
router.get("/", cors(corsOptions), async function(req, res, next) {
  const customers = await Customer.findAll();
  res.json(customers);
});

/* GET get customer by customer id api */
router.get("/:id", cors(corsOptions), async function(req, res, next) {
  const customer = await Customer.findById(req.params.id, res);
  res.json(customer);
});

/* POST add new customer api */
router.post("/", cors(corsOptions), async function(req, res, next) {
  const customer = await Customer.create(req, res);
  if (customer) {
    res.json({
      message: "Create new customer successful"
    });
  } else {
    res.json({
      message: "Create new customer failure"
    });
  }
});

/* POST remove customer api */
router.post("/remove/:id", cors(corsOptions), async function(req, res, next) {
  const result = await Customer.remove(req.params.id, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Remove customer information failure"
    });
  } else {
    res.json({
      message: "Remove customer information successful"
    });
  }
});

/* PUT update customer api */
router.put("/:id", cors(corsOptions), async function(req, res, next) {
  const result = await Customer.update(req.params.id, req, res);
  if (!result[0]) {
    res.status(400).json({
      message: "Update customer information failure"
    });
  } else {
    res.json({
      message: "Update customer information successful"
    });
  }
});

module.exports = router;
