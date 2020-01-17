var express = require("express");
var route = express.Router();

const CustomField = require("../controllers/customField");
const InfoCustomField = require("../controllers/infoCustomField");

route.post("/", async (req, res) => {
  const { name, require, assignee } = req.body;
  if (name) {
    let existCustomField = await CustomField.findCustomFieldByName(name);
    if (existCustomField) {
      res.json({ status: 300, mes: "Da ton tai custom field" });
    } else {
      let customFieldCreated = await CustomField.createCustomField({
        name,
        require
      });
      Promise.all(
        assignee.map(idProject =>
          InfoCustomField.createInfoCustomField({
            name: require ? "require" : "",
            project_id: idProject,
            custom_field_id: customFieldCreated.dataValues.id
          })
        )
      );
      res.json(customFieldCreated.dataValues);
    }
  } else {
    res.json({ status: 400 });
  }
});

route.get("/", async (req, res) => {
  let customFields = await CustomField.getAllCustomField();
  res.json({ status: 200, listCustomField: customFields });
});

route.delete("/:idCustomField", async (req, res) => {
  let { idCustomField } = req.params;
  if (idCustomField) {
    let customFieldDeleted = await CustomField.deleteCustomField(idCustomField);
    res.json({ status: 200, customFieldDeleted });
  } else {
    res.json({ status: 400 });
  }
});

route.post("/:idCustomField/assigneeProject", async (req, res) => {
  const { projects, idCustomField } = req.body;
  if (projects && idCustomField && projects.length > 0) {
    let listProjectAssignee = await CustomField.assigneeProject(
      idCustomField,
      projects
    );
    if (listProjectAssignee) {
      res.json({ status: 200, listProjectAssignee });
    } else {
      res.json({ status: 400 });
    }
  } else {
    res.json({ status: 400 });
  }
});

route.delete("/:idCustomField/assigneeProject/", async (req, res) => {
  const { projects } = req.body;
  const { idCustomField } = req.params;
  if (projects && idCustomField && projects.length > 0) {
    let listProjectAssignee = await CustomField.removeAssigneeProject(
      idCustomField,
      projects
    );
    if (listProjectAssignee) {
      res.json({ status: 200, listProjectAssignee });
    } else {
      res.json({ status: 400 });
    }
  } else {
    res.json({ status: 400 });
  }
});

route.put("/:idCustomField", async (req, res) => {
  const { name, require } = req.body;
  const { idCustomField } = req.params;
  if (name) {
    let updated = await CustomField.updateCustomField(idCustomField, {
      name,
      require
    });
    if (updated) {
      res.json({ status: 200, updated });
    } else {
      res.json({ status: 400 });
    }
  } else {
    res.json({ status: 400 });
  }
});

module.exports = route;
