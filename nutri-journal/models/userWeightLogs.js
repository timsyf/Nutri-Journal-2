const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userWeightLogsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref:"User" },
    weight: { type: String, required: true, min: 0 },
    date: { type: Date, required: true, default: getCurrentTime() },
}, {
    timestamps: true,
});

function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

module.exports = mongoose.model('UserWeightLogs', userWeightLogsSchema);