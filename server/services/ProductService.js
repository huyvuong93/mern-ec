const { Product, ProductImage } = require('../models/Product');
const path = require('path');
const fs = require('fs');
const { expressLogger } = require('../services/LogService')

module.exports = class ProductService {
  static async fetchAllProducts() {
    try {
      return await Product.find();
    } catch (err) {
      expressLogger.error(err.message);
      console.log(err);
    }
  }

  static async fetchProductById(id) {
    try {
      return await Product.findById(id);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async fetchProductByConditions(conditions) {
    try {
      return await Product.findOne(...conditions);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async createNewProduct(req) {
    const product = await new Product(req.body).save();
    if (product) {
      if (req.files !== null) {
        return await this.uploadImages(product, req.files);
      }
    } else {
      return false;
    }
  }

  static async updateProduct(id, req) {
    const data = req.body;
    const images = req.files;
    const product = await this.fetchProductById(id);
    try {
      const result = await Product.updateOne({_id: id}, {$set: data});
      if (result) {
        if (images) {
          await this.deleteImages(product);
          await this.uploadImages(product, images);
        }
      }
      return true;
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async deleteProduct(id) {
    const product = await this.fetchProductById(id);
    if (product) {
      try {
        return await product.deleteOne();
      } catch (err) {
        expressLogger.error(err.message);
        return false;
      }
    } else {
      throw new Error('Product does not exist.')
    }
  }

  static async uploadImages(product, files) {
    const storageDest = path.join(__dirname) +
      `/../uploads/product/${product._id}`;
    if (!fs.existsSync(storageDest)) {
      fs.mkdirSync(storageDest, {recursive: true});
    }
    const promises = [];
    files.forEach((file) => {
      const src = fs.createReadStream(file.path);
      const dest = fs.createWriteStream(`${storageDest}/${file.filename}`);
      src.pipe(dest);
      const productImage = new ProductImage({
        path: `/uploads/product/${product._id}/${file.filename}`,
        product: product._id,
      }).save();
      promises.push(productImage);
    })
    if (promises.length > 0) {
      await Promise.all(promises).then((images) => {
        product.updateOne({$push: {images: {$each: images}}}, null, (err) => {
          if (err) {
            return false;
          }
        });
      })
    }
    return true;
  }

  static async deleteImages(product)
  {
    try {
      const storageDest = path.join(__dirname) +
        `/../uploads/product/${product._id}`;
      if (fs.existsSync(storageDest)) {
        fs.rmdirSync(storageDest, {recursive: true});
      }
      const deleteProductImage = ProductImage.deleteMany({product: product._id});
      const updateProduct = product.updateOne({images: []});
      await Promise.all([deleteProductImage, updateProduct]).catch(err => {
        expressLogger.error(err.message);
        return false;
      })
      return true;
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }
};