var express = require("express");
var router = express.Router();

var Data = require("../controllers/data");

/* GET get all value types api */
router.get("/valueType", async function (req, res) {
    const valueType = await Data.findAllValueType();
    res.json(valueType);
});

/* GET get all base custom fields api */
router.get("/baseCustomField", async function (req, res) {
    const baseCustomField = await Data.findAllBaseCustomField();
    res.json(baseCustomField);
});
module.exports = router;