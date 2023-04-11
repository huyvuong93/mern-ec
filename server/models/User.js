const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type:String,
    required: true,
  },
  gender: {
    type:String,
    required: true,
  },
  address: String,
});

User.pre("save", async function(next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

module.exports = mongoose.model('User', User);