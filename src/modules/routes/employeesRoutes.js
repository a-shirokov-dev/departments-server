const express = require('express');
const routerEmployee = express.Router();

const {
  getEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee
} = require('../controllers/employeesControllers');

routerEmployee.get('/employees', getEmployees);
routerEmployee.post('/employee/add', createEmployee);
routerEmployee.patch('/employee/edit', editEmployee);
routerEmployee.delete('/employee/delete', deleteEmployee);

module.exports = routerEmployee;
