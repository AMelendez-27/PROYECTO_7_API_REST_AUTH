const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {type: String, required: true},
  model: {type: String, required: true},
  type: {type: String, required: true, enum: ["Suv", "Sport", "Coupe", "Sedan", "Hatchback", "4x4"]},
  price: {type: Number, required: true},
}, {timestamps: true});

module.exports = mongoose.model('cars', carSchema, "cars");