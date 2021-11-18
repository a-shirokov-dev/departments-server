const Department = require('../../db/models/departments');
const Employee = require('../../db/models/employees');
const { validationResult } = require('express-validator');

module.exports.getDepartments = async (req, res, next) => {
  Department.find().then(result => {
		res.send({data: result});
	});
};

module.exports.createDepartment = async (req, res, next) => {
	Department.find({ name: req.body.name })
		.then(result => {
			if (result.length !== 0)
				return res.status(300).send({
					message: 'Email is already taken!'
				});
		});

	const allFields = true;
	if (!reqBodyIsValid(req.body, allFields)) {
		return res.status(300)
			.send({
				message: 'Invalid department data. Fill all fields!'
			});
	}

	const department = Department(req.body);
	department.save()
		.then(result => {
			res.status(200)
				.send({ data: result });
		})
};

module.exports.editDepartment = async (req, res, next) => {
	const noAllFields = false;
	if (reqBodyIsValid(req.body, noAllFields)) {
		Department.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (_err, doc) => {
			if (!doc) {
				return res.status(404).send({
          message: "Department doesn't exist",
        });
			}
			res.status(200).send(doc);
		}).then(result => {
			console.log(result)
			res.send({ data: result });			
		})
	} else {
		res.status(400).send({
			message: 'Error! Fill some or all fields!'
		});
	}
};

module.exports.deleteDepartment = async (req, res, next) => {
	Employee.find({ department: req.query._id })
		.then(result => {
			if (result.length !== 0)
				return res.status(422).send({
					message: 'Array is not empty!'
				});
		});

	Department.deleteOne({ _id: req.query._id }, (err, deletedCount) => {
		if (err || deletedCount.deletedCount === 0)
			return res.status(422).send({
				message: `${err}!`
			});

		res.status(200).send({
			deletedCount,
			message: `Successfully! DeletedCount is ${deletedCount.deletedCount}`
		});
	})
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
