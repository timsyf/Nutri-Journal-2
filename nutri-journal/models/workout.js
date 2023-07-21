const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref:"User" },
    exerciseId: { type: Schema.Types.ObjectId, ref:"Food" },
    type: { type: String, required: true },
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

module.exports = mongoose.model('MealRegimen', workoutSchema);