const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  neighborhood: { type: mongoose.Schema.Types.ObjectId, ref: "neighborhoods" },
  number: {type: Number, required: true},
  size: {type: Number, required: true}
}, 
{
  timestamps: true, 
  collection: "houses"
  });

module.exports = mongoose.model('houses', houseSchema, "houses");