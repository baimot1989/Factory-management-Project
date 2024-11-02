const employeeRepo = require('../repositories/employeeRepo');

const getAllEmployee = () => {
    return employeeRepo.getAllEmployee();
 };
const getEmployeeById = (id) => {
    return employeeRepo.getEmployeeById(id);
 };
const addEmployee = (obj) => {
    return employeeRepo.addEmployee(obj);
 };
// const updateEmployee = (id, obj) => {
//     return employeeRepo.updateEmployee(id, obj);
//  };

 const updateEmployee  = async (id, obj) => {
   const {shiftId, indc } = obj;
if(indc) { //  the if bolck checks if the update is for employeesId array properte or the rest of properties 
   const employee = await getEmployeeById(id)
   employee.shiftsId.push(shiftId)
   return employeeRepo.updateEmployee(id, employee);
}
 return employeeRepo.updateEmployee(id, obj);
};

 const deleteEmployee = (id) => {
    return employeeRepo.deleteEmployee(id);
 };

 module.exports = {
    getAllEmployee,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
 }