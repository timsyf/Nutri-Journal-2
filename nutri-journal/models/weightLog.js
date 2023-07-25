const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weightLogSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref:"User" },
    weight: { type: String, required: true, min: 0 },
    date: { type: Date, required: true, default: getCurrentTime() },
}, {
    timestamps: true,
});

function getCurrentTime() {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const day = currentTime.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
}

module.exports = mongoose.model('WeightLog', weightLogSchema);