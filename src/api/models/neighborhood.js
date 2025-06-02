const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
  name: {type: String, required: true},
  country: {type: String, required: true},
  city: {type: String, required: true},
  code: {type: Number, required: true},
  house: [{ type: mongoose.Schema.Types.ObjectId, ref: "houses" }]
}, 
{
  timestamps: true, 
  collection: "neighborhoods"
  });

module.exports = mongoose.model('neighborhoods', neighborhoodSchema, "neighborhoods");