const ProductService = require('../services/ProductService');
const { expressLogger } = require('../services/LogService')

module.exports = class ProductController {
  static async index(req, res) {
    const conditions = req.params || null
    try {
      const products = await ProductService.fetchAllProducts(conditions);
      if (!products) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(products)
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const product = await ProductService.fetchProductById(id);
      if (!product) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async create(req, res) {
    try {
      const product = await ProductService.createNewProduct(req, res);
      if (product) {
        res.status(200).json({message: "Product created successfully."});
      } else {
        res.status(400).json({message: "Err"});
      }
    } catch (err) {
      expressLogger.error(err.message);
      console.log(err);
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    try {
      ProductService.updateProduct(id, req).then(() => {
        res.status(200).json({ message: "Successfully Updated." })
      }).catch((err) => {
        expressLogger.error(err.message);
        res.status(500).json({ message: "Register Failed. Please try again" })
      });
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    try {
      await ProductService.deleteProduct(id);
      res.status(200).json({message: "Successfully Deleted."})
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }
}