const InfoCustomField = require("../models/InfoCustomField");

module.exports = {
  createInfoCustomField: async Info => {
    return await InfoCustomField.create(Info);
  },
  getByProjectAndCustomField: async (project_id, custom_field_id) => {
    return InfoCustomField.findOne({ where: { project_id, custom_field_id } });
  }
};
