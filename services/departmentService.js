const departmentRepo = require('../repositories/departmentRepo');

const getAllDepartment = () => {
    return departmentRepo.getAllDepartment();
 };
const getDepartmentById = (id) => {
    return departmentRepo.getDepartmentById(id);
 };
const addDepartment = (obj) => {
    return departmentRepo.addDepartment(obj);
 };
const updateDepartment = (id, obj) => {
    return departmentRepo.updateDepartment(id, obj);
 };

 const deleteDepartment = (id) => {
    return departmentRepo.deleteDepartment(id);
 };
 

 module.exports = {
    getAllDepartment,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment
 }