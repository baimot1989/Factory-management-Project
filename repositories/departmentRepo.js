const Department = require('../modelCollection/departmentModel');

const getAllDepartment = () => {
    return Department.find();
};
 const getDepartmentById = (id) => {
    return Department.findById(id)
 };
 const addDepartment = (obj) => {
    const department = new Department(obj);
    return department.save();
 };
 const updateDepartment = (id, obj) => {
    return Department.findByIdAndUpdate(id, obj);
 };
 const deleteDepartment = (id) => {
    return Department.findByIdAndDelete(id); 
 };

module.exports = { getAllDepartment, getDepartmentById, addDepartment, updateDepartment, deleteDepartment }