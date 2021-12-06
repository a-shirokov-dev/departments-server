const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const employeeSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  position: { type: String, required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
    required: true,
  },
});

module.exports = Employee = mongoose.model("employee", employeeSchema);
