const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        trim: true,
    },
    calories: {
        type: Number,
        required: true,
        min: 0,
        max: 5000,
    },
  }, {
    timestamps: true,
  });

module.exports = mongoose.model('Exercise', exerciseSchema);