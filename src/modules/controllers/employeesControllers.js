const Employee = require('../../db/models/employees');

module.exports.getEmployees = async (req, res, next) => {
	const departmentName = { currentDepartment: req.department.name }

  Department.find(departmentName).then(result => {
		res.send({data: result});
	});
};

module.exports.createEmployee = async (req, res, next) => {
	const allFields = true;
	if (reqBodyIsValid(req.body, allFields)) {
		//	create employee
		req.body.currentDepartment = req.department.name;
		const employee = new Employee(req.body);
		employee.save().then(result => {	//	may be remove this result?
			Employee.find({ currentDepartment: req.department.name }).then(result => {
				res.send({ data: result });
			});
		});
	}	else {
		res.status(400).send({
			message: 'Invalid data'
		});
	}
};

module.exports.editEmployee = async (req, res, next) => {
	const noAllFields = false;
	if (reqBodyIsValid(req.body, noAllFields)) {
		Employee.updateOne({ _id: req.body._id }, req.body).then(result => {
			Employee.find({ currentDepartment: req.department.name }).then(result => {
				res.send({ data: result });
			});
		});
	} else {
		res.status(422).send({
			message: 'Error! Fill some or all fields!'
		});
	}
};

module.exports.deleteEmployee = async (req, res, next) => {
  if (req.query._id) {
		Employee.deleteOne({ _id: req.query._id}).then(result => {
			Employee.find({ currentDepartment: req.department.name }).then(result => {	//	req.department._id
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
			&& reqBody.hasOwnProperty('email')
			&& reqBody.hasOwnProperty('name')
			&& reqBody.hasOwnProperty('age')
			&& reqBody.hasOwnProperty('position')) {
		const { email, name, age, position } = reqBody;
			if (email
					&& name
					&& age
					&& position) {
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
