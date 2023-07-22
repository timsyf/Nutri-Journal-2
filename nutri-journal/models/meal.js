const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref:"User" },
    foodId: { type: Schema.Types.ObjectId, ref:"Food" },
    type: { type: String },
    date: { type: Date, default: getCurrentTime() },
}, {
    timestamps: true,
});

function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

module.exports = mongoose.model('MealSchema', mealSchema);