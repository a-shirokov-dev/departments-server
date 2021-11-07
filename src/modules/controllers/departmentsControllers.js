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
	const noAllFields = false;
	if (reqBodyIsValid(req.body, noAllFields)) {
		Department.updateOne({ _id: req.body._id }, req.body).then(result => {
			Department.find().then(result => {
				res.send({ data: result });
			});
		});
	} else {
		res.status(422).send({
			message: 'Error! Fill some or all fields!'
		});
	}
};

module.exports.deleteDepartment = async (req, res, next) => {
  if (req.query._id) {
		Department.deleteOne({ _id: req.query._id}).then(result => {
			Department.find().then(result => {
				res.send({ data: result});
			});
		});
	} else {
		res.status(422).send({
			message: 'Error! Param is not correct!'
		});
	}  
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
