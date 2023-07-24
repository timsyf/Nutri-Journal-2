const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Add the bcrypt library
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 2,
        required: true
    },
    physique: {
      age: { type: Number, required: true, min: 0 },
      gender: { type: String, required: true, min: 0 },
      height: { type: Number, required: true, min: 0 },
      weight: { type: Number, required: true, min: 0 },
    },
    goals: {
      weight: { type: Number, required: true, min: 0 },
      carbohydrate: { type: Number, required: true, min: 0 },
      protein: { type: Number, required: true, min: 0 },
      //fat: { type: Number, required: true, min: 0 },
      //trans_Fat: { type: Number, required: true, min: 0 },
      //saturated_Fat: { type: Number, required: true, min: 0 },
      //polyunsaturated_Fat: { type: Number, required: true, min: 0 },
      //monounsaturated_Fat: { type: Number, required: true, min: 0 },
      //cholesterol: { type: Number, required: true, min: 0 },
      //sodium: { type: Number, required: true, min: 0 },
      //potassium: { type: Number, required: true, min: 0 },
      //fiber: { type: Number, required: true, min: 0 },
      //sugar: { type: Number, required: true, min: 0 },
      //vitamin_A: { type: Number, required: true, min: 0 },
      //vitamin_C: { type: Number, required: true, min: 0 },
      //calcium: { type: Number, required: true, min: 0 },
      //iron: { type: Number, required: true, min: 0 },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    }, {
        timestamps: true,
        toJSON: {
          transform: function(doc, ret) {
            delete ret.password;
            return ret;
          }
        }
      });

      userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        return next();
      });
      
      module.exports = mongoose.model('User', userSchema);