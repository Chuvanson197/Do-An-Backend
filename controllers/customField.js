const CustomField = require("../models/CustomField");
const InfoCustomField = require("../models/InfoCustomField");
const Project = require("../models/Project");

module.exports = {
  createCustomField: async customField => {
    return await CustomField.create(customField);
  },
  findCustomFieldByName: async name => {
    return await CustomField.findOne({
      attributes: ["id", "name", "require"],
      where: { name }
    });
  },
  getAllCustomField: async () => {
    return await CustomField.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: InfoCustomField,
          as: "infocustomField",
          attributes: ["id"],
          include: [
            {
              model: Project,
              as: "project",
              attributes: ["id", "name"]
            }
          ]
        }
      ]
    });
  },
  deleteCustomField: async id => {
    let deleted = await CustomField.destroy({ where: { id } });
    return deleted;
  },
  assigneeProject: async (idCustomField, projects) => {
    const customFieldExist = await CustomField.findOne({
      where: { id: idCustomField }
    });
    if (customFieldExist) {
      return await Promise.all(
        projects.map(project =>
          InfoCustomField.create({
            name: customFieldExist.dataValues.require ? "require" : "",
            project_id: project,
            custom_field_id: idCustomField
          })
        )
      );
    } else {
      return;
    }
  },
  removeAssigneeProject: async (idCustomField, projects) => {
    const customFieldExist = await CustomField.findOne({
      where: { id: idCustomField }
    });
    if (customFieldExist) {
      return await Promise.all(
        projects.map(project =>
          InfoCustomField.destroy({
            where: { project_id: project }
          })
        )
      );
    } else {
      return;
    }
  },
  updateCustomField: async (idCustomField, dataUpdate) => {
    const customFieldExist = await CustomField.findOne({
      where: { id: idCustomField }
    });
    if (customFieldExist) {
      if (
        customFieldExist.dataValues.require !== dataUpdate.require &&
        !customFieldExist.dataValues.require
      ) {
        InfoCustomField.update(
          { name: "require" },
          { where: { custom_field_id: idCustomField, name: null } }
        );
      }
      return await CustomField.update(dataUpdate, {
        where: { id: idCustomField }
      });
    } else {
      return;
    }
  }
};
