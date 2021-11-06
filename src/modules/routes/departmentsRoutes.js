const express = require('express');
const routerDepartment = express.Router();

const {
  getDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment
} = require('../controllers/departmentsControllers');

routerDepartment.get('/getDepartments', getDepartments);
routerDepartment.post('/createDepartment', createDepartment);
routerDepartment.patch('/editDepartment', editDepartment);
routerDepartment.delete('/deleteDepartment', deleteDepartment);

module.exports = routerDepartment;
