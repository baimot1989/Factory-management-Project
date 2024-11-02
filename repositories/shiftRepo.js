const Shift = require('../modelCollection/shiftModel');

const getAllShift = () => {
    return Shift.find();
};
const getShiftById = (id) => {
    return Shift.findById(id);
};
const addShift = (obj) => {
    const shift = new Shift(obj);
    return shift.save();
};
const updateShift = (id, obj) => {
    return Shift.findByIdAndUpdate(id, obj);
};

const deleteShift = (id) => {
    return Shift.findByIdAndDelete(id);
};

module.exports = {
    getAllShift,
    getShiftById,
    addShift,
    updateShift,
    deleteShift,
}