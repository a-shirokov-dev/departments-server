const Department = require('../../db/models/departments');
const { validationResult } = require('express-validator');

module.exports.getDepartments = async (req, res, next) => {
  Department.find().then(result => {
		res.send({data: result});
	});
};

module.exports.createDepartment = async (req, res, next) => {
	const department = Department(req.body);
	const { name, description } = req.body;
	const departmentNameIsUsed = await Department.findOne({ name });
	const allFields = true;
	if (departmentNameIsUsed) {
		return res.status(300).json({
			message: "Department name is already taken, please try another."
		});
	}
	if (reqBodyIsValid(req.body, allFields)) {
		department.save().then(result => {
			res.send({ data: result });
		})
	} else {
		res.status(422).send('Data! Params not correct!')
	}
};

module.exports.editDepartment = async (req, res, next) => {

};

module.exports.deleteDepartment = async (req, res, next) => {
  
};

const reqBodyIsValid = (reqBody, fillAllFields) => {
	if (fillAllFields	//	for create
			&& reqBody.hasOwnProperty('name')
			&& reqBody.hasOwnProperty('description')) {
		const { name, description } = reqBody;
			if (name && description) {
				return true;
			} else {
				return false;
			}
	} else if (!fillAllFields	//	for edit
						&& reqBody.hasOwnProperty('_id')
						&& (reqBody.hasOwnProperty('name')
						|| reqBody.hasOwnProperty('description'))) {
		return true;
	} else {
		return false;		
	}
}
