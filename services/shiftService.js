const shiftRepo = require('../repositories/shiftRepo');

const getAllShift = () => {
    return shiftRepo.getAllShift();
 };
const getShiftById = (id) => {
    return shiftRepo.getShiftById(id);
 };
const addShift = (obj) => {
    return shiftRepo.addShift(obj);
 };
const updateShift = (id, obj) => {
    return shiftRepo.updateShift(id, obj);
 };
 const deleteShift = (id) => {
    return shiftRepo.deleteShift(id);
 };

 module.exports = {
    getAllShift,
    getShiftById,
    addShift,
    updateShift,
    deleteShift
 }