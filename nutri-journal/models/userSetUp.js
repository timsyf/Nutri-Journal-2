const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSetUpSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref:"User", required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    height: { type: Number, required: true, min: 0, default: 0 },
    weight: { type: Number, required: true, min: 0, default: 0 },
    calorie: { type: Number, required: true, min: 0, default: 0 },
    carbohydrate: { type: Number, required: true, min: 0, default: 0 },
    protein: { type: Number, required: true, min: 0, default: 0 },
    fat: { type: Number, min: 0, default: 0 },
    trans_Fat: { type: Number, min: 0, default: 0 },
    saturated_Fat: { type: Number, min: 0, default: 0 },
    polyunsaturated_Fat: { type: Number, min: 0, default: 0 },
    monounsaturated_Fat: { type: Number, min: 0, default: 0 },
    cholesterol: { type: Number, min: 0, default: 0 },
    sodium: { type: Number, min: 0, default: 0 },
    potassium: { type: Number, min: 0, default: 0 },
    fiber: { type: Number, min: 0, default: 0 },
    sugar: { type: Number, min: 0, default: 0 },
    vitamin_A: { type: Number, min: 0, default: 0 },
    vitamin_C: { type: Number, min: 0, default: 0 },
    calcium: { type: Number, min: 0, default: 0 },
    iron: { type: Number, min: 0, default: 0 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('UserSetUp', userSetUpSchema);