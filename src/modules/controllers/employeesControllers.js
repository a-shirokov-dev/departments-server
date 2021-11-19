const Employee = require("../../db/models/employees");

module.exports.getEmployees = async (req, res) => {
  Employee.find({ department: req.params.department })
    .populate("department")
    .then((result) => {
      res.status(200).send({
        status: 200,
        data: result,
      });
    });
};

module.exports.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  employee.save().then((result) => {
    res.status(201).send({
      status: 201,
      data: result,
    });
  });
};

module.exports.editEmployee = async (req, res) => {
  Employee.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (_err, doc) => {
      if (!doc) {
        return res.status(404).send({
          status: 404,
          message: "Employee doesn't exist",
        });
      }
      res.status(200).send(doc);
    }
  );
};

module.exports.deleteEmployee = async (req, res) => {
  Employee.deleteOne({ _id: req.params.id }, (err, deletedCount) => {
    if (err || deletedCount.deletedCount === 0)
      return res.status(404).send({
        status: 404,
        message: "Employee doesn't exist",
      });

    res.status(200).send({
      status: 200,
    });
  });
};
