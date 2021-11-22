const express = require("express");
const routerEmployee = express.Router();

const { employeeValidation } = require("../../modules/middleware/middleware");

const {
  getEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employeesControllers");

routerEmployee.get("/employees/:department", getEmployees);
routerEmployee.post("/employee/add", employeeValidation, createEmployee);
routerEmployee.patch("/employee/edit/:id", employeeValidation, editEmployee);
routerEmployee.delete("/employee/delete/:id", deleteEmployee);

module.exports = routerEmployee;
