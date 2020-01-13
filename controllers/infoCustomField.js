const InfoCustomField = require("../models/InfoCustomField");

module.exports = {
  createInfoCustomField: async Info => {
    return await InfoCustomField.create(Info);
  }
};
