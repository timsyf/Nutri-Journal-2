const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true, trim: true },
    carbohydrate: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    fat: { type: Number, required: true, min: 0 },
    trans_Fat: { type: Number, required: true, min: 0 },
    saturated_Fat: { type: Number, required: true, min: 0 },
    polyunsaturated_Fat: { type: Number, required: true, min: 0 },
    monounsaturated_Fat: { type: Number, required: true, min: 0 },
    cholesterol: { type: Number, required: true, min: 0 },
    sodium: { type: Number, required: true, min: 0 },
    potassium: { type: Number, required: true, min: 0 },
    fiber: { type: Number, required: true, min: 0 },
    sugar: { type: Number, required: true, min: 0 },
    vitamin_A: { type: Number, required: true, min: 0 },
    vitamin_C: { type: Number, required: true, min: 0 },
    calcium: { type: Number, required: true, min: 0 },
    iron: { type: Number, required: true, min: 0 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Food', foodSchema);