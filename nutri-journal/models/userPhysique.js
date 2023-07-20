const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPhysiqueSchema = new Schema({
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 },
    weight: { type: Number, required: true, min: 0 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('UserPhysique', userPhysiqueSchema);