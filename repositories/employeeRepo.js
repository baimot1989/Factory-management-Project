const Employee = require('../modelCollection/employeeModel');

const getAllEmployee = () => {
    return Employee.find();
};
const getEmployeeById = (id) => {
    return Employee.findById(id);
};
const addEmployee = (obj) => {
    const employee = new Employee(obj);
    return employee.save();
};
const updateEmployee = (id, obj) => {
    return Employee.findByIdAndUpdate(id, obj);
}; 
const deleteEmployee = (id) => {
    return Employee.findByIdAndDelete(id);
};

module.exports = {
    getAllEmployee,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}