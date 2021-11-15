const express = require('express');
const routerDepartment = express.Router();

const {
  getDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment
} = require('../controllers/departmentsControllers');

routerDepartment.get('/departments', getDepartments);
routerDepartment.post('/department/add', createDepartment);
routerDepartment.patch('/department/edit', editDepartment);
routerDepartment.delete('/department/delete', deleteDepartment);

module.exports = routerDepartment;
