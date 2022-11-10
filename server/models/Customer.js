const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
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

module.exports = mongoose.model('Customer', CustomerSchema);