const express = require('express');
const routerEmployee = express.Router();

const {
  employeeValidation
} = require('../../modules/middleware/middleware');

const {
  getEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee
} = require('../controllers/employeesControllers');

routerEmployee.get('/employees', getEmployees);
routerEmployee.post('/employee/add', employeeValidation, createEmployee);
routerEmployee.patch('/employee/edit', employeeValidation, editEmployee);
routerEmployee.delete('/employee/delete', deleteEmployee);

module.exports = routerEmployee;
