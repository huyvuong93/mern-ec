const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const Admin = new Schema({
  login_id: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type:String,
    required: true,
  },
});
Admin.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

Admin.pre("insertMany", async function(next, docs) {
  docs.map((doc) => {
    doc.password = bcrypt.hashSync(doc.password,10);
  })
  next();
})

module.exports = mongoose.model('Admin', Admin);