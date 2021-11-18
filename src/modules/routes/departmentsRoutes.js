const express = require('express');
const routerDepartment = express.Router();

const {
  departmentValidation
} = require('../../modules/middleware/middleware');

const {
  getDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment
} = require('../controllers/departmentsControllers');

routerDepartment.get('/departments', getDepartments);
routerDepartment.post('/department/add', departmentValidation, createDepartment);
routerDepartment.patch('/department/edit', departmentValidation, editDepartment);
routerDepartment.delete('/department/delete', deleteDepartment);

module.exports = routerDepartment;
