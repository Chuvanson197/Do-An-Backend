const ValueType = require("../models/ValueType");
const BaseCustomField = require("../models/BaseCustomField");


module.exports = {
    findAllValueType() {
        return ValueType.findAll({
            attributes: [
                "id",
                "value"
            ], where: {}
        });
    },
    findAllBaseCustomField() {
        return BaseCustomField.findAll({
            attributes: [
                "id",
                "name",
                "require",
                "default_value",
                "value_type"
            ]
        });
    }
}