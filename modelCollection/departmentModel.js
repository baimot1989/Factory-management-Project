const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        manager: String
    },
    { versionKey: false }

);

const Department = mongoose.model('department', departmentSchema);

module.exports = Department;