const express = require('express');
const routerEmployee = express.Router();

const {
  getEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee
} = require('../controllers/employeesControllers');

routerEmployee.get('/getEmployees', getEmployees);
routerEmployee.post('/createEmployee', createEmployee);
routerEmployee.patch('/editEmployee', editEmployee);
routerEmployee.delete('/deleteEmployee', deleteEmployee);

module.exports = routerEmployee;
