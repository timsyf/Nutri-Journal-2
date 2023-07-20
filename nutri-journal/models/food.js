const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    carbohydrate: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    fat: { type: Number, required: true, min: 0 },
    transFat: { type: Number, required: true, min: 0 },
    saturatedFat: { type: Number, required: true, min: 0 },
    polyunsaturatedFat: { type: Number, required: true, min: 0 },
    monounsaturatedFat: { type: Number, required: true, min: 0 },
    cholesterol: { type: Number, required: true, min: 0 },
    sodium: { type: Number, required: true, min: 0 },
    potassium: { type: Number, required: true, min: 0 },
    fiber: { type: Number, required: true, min: 0 },
    sugar: { type: Number, required: true, min: 0 },
    vitaminA: { type: Number, required: true, min: 0 },
    vitaminC: { type: Number, required: true, min: 0 },
    calcium: { type: Number, required: true, min: 0 },
    iron: { type: Number, required: true, min: 0 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Food', foodSchema);