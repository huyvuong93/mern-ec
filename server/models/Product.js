const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  order_no: {
    type: Number
  }
})

const Tag = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  order_no: {
    type: Number
  }
});

const Brand = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

const ProductImage = new Schema({
  path: {
    type: String
  }
});

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
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }],
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand"
  }
});

module.exports = {
  Product: mongoose.model('Product', Product),
  ProductImage: mongoose.model('ProductImage', ProductImage),
  Category: mongoose.model('Category', Category),
  Tag: mongoose.model('Tag', Tag),
  Brand: mongoose.model('Brand', Brand),
}
