const Department = require("../../db/models/departments");
const Employee = require("../../db/models/employees");

module.exports.getDepartments = async (_req, res) => {
  Department.find((err, result) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        message: "Get department error",
      });
    }

    res.status(200).send({
      status: 200,
      data: result,
    });
  });
};

module.exports.createDepartment = async (req, res) => {
  const department = Department(req.body);

  department.save((err, result) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        message: "Create department error",
      });
    }

    res.status(201).send({
      status: 201,
      data: result,
    });
  });
};

module.exports.editDepartment = async (req, res) => {
  Department.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (_err, doc) => {
      if (!doc) {
        return res.status(400).send({
          status: 400,
          message: "Name is required and must be unique",
        });
      }

      res.status(200).send(doc);
    }
  );
};

module.exports.deleteDepartment = async (req, res) => {
  Employee.find({ department: req.params.id }).then((result) => {
    if (result.length !== 0)
      return res.status(400).send({
        message: "Department is not empty!",
      });

    Department.deleteOne({ _id: req.params.id }, (err, deletedCount) => {
      if (err || deletedCount.deletedCount === 0)
        return res.status(404).send({
          status: 404,
          message: "Department doesn't exist",
        });

      res.status(200).send({
        status: 200,
      });
    });
  });
};
