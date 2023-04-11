const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type:String,
    required: true,
  },
  detail: {
    type:String
  },
  images : [{
    type: Schema.Types.ObjectId,
    ref: "ProductImage"
  }]
});

const ProductImage = new Schema({
  path: {
    type: String
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
});

module.exports = {
  Product: mongoose.model('Product', Product),
  ProductImage: mongoose.model('ProductImage', ProductImage),
}
