const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const employeeSchema = new Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  age: {type: Number, required: true},
  position: {type: String, required: true},
  // currentDepartment: {type: String, required: true}, //  or object._id from departments
  department: { type: Schema.Types.ObjectId, ref: "department" , required: true}
});

module.exports = Employee = mongoose.model('employee', employeeSchema);
