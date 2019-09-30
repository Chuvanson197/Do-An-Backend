var express = require("express");
var router = express.Router();
var Customer = require("../Models/Customer");
const passport = require("passport");

router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Customer.getAllCustomer((err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

/* GET get customer by id. */
router.get("/:id", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Customer.getCustomerById(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

/* POST add new customer */
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Customer.addCustomer(req.body, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.body);
    }
  });
});

/* PUT update customer */
router.put("/:id", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  Customer.updateCustomer(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;