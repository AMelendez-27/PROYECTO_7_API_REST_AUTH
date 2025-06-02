const mongoose = require('mongoose');

const carDealershipSchema = new mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true},
  size: {type: Number, required: true},
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "cars" }]
}, {timestamps: true});

module.exports = mongoose.model('carDealerships', carDealershipSchema, "carDealerships");