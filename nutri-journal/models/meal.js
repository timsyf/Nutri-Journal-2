const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref:"User", required: true },
    foodId: { type: Schema.Types.ObjectId, ref:"Food", required: true },
    type: { type: String, required: true },
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

module.exports = mongoose.model('Meal', mealSchema);