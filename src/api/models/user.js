const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {type: String, required: true},
    password: {type: String, required: true},
    houses: [{type: mongoose.Schema.Types.ObjectId, ref: 'houses'}],
  },
  {
    timestamps: true, 
    collection: "users"
  }
);

userSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, 10);
})

module.exports = mongoose.model('users', userSchema, "users");