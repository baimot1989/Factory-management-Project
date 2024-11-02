const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
        firstName: {type: String, require: true},
        lastName: {type: String, require: true},
        startWorkYear: {type: Number, require: true},
        departmentId: String,
        shiftsId: [String]
    },
    { versionKey: false }
);

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;