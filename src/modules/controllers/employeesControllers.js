const Employee = require('../../db/models/employees');

module.exports.getEmployees = async (req, res, next) => {
	Employee.find({ department: req.query.department })
		.populate("department")
		.then(result => {
			res.send({ data: result });
		});
};

module.exports.createEmployee = async (req, res, next) => {
	Employee.find({ email: req.body.email })
		.then(result => {
			if (result.length !== 0)
				return res.status(422).send({
					message: 'Email is already taken!'
				});
		})
		
	const allFields = true;
	if (!reqBodyIsValid(req.body, allFields)) {
		return res.status(400)
			.send({
				message: 'Invalid employee data. Fill all fields!'
			});
	}

	const employee = new Employee(req.body);
	employee.save()
		.then(result => {
			res.status(200)
				.send({ data: result });
		});
};

module.exports.editEmployee = async (req, res, next) => {
	const noAllFields = false;
	if (reqBodyIsValid(req.body, noAllFields)) {
		Employee.updateOne({ _id: req.body._id }, req.body)
			.then(result => {
				console.log(data)
				res.send({ data: result });
			});
	} else {
		res.status(422).send({
			message: 'Error! Fill some or all fields!'
		});
	}
};

module.exports.deleteEmployee = async (req, res, next) => {
	Employee.deleteOne({ _id: req.query._id }, (err, deletedCount) => {
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
		&& reqBody.hasOwnProperty('email')
		&& reqBody.hasOwnProperty('name')
		&& reqBody.hasOwnProperty('age')
		&& reqBody.hasOwnProperty('position')
		&& reqBody.hasOwnProperty('department')) {
		const { email, name, age, position, department } = reqBody;
		if (email
			&& name
			&& age
			&& position
			&& department) {
			return true;
		} else {
			return false;
		}
	} else if (!fillAllFields	//	for edit
		&& reqBody.hasOwnProperty('_id')
		&& (reqBody.hasOwnProperty('email')
			|| reqBody.hasOwnProperty('name')
			|| reqBody.hasOwnProperty('age')
			|| reqBody.hasOwnProperty('position'))) {
		return true;
	} else {
		return false;
	}
}
