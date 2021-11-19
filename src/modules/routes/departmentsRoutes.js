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
routerDepartment.patch('/department/edit/:id', departmentValidation, editDepartment);
routerDepartment.delete('/department/delete/:id', deleteDepartment);

module.exports = routerDepartment;
