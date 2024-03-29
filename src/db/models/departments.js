const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const departmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

module.exports = Department = mongoose.model("department", departmentSchema);
