const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
    {
        date: {type: String, require: true},
        startingHour: {type: String, require: true},
        endingHour: {type: String, require: true}
    },
    {versionKey: false}
);

const Shift = mongoose.model('shift', shiftSchema);

module.exports = Shift;