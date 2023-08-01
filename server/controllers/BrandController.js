const BrandService = require('../services/BrandService');
const { expressLogger } = require('../services/LogService')

module.exports = class BrandController {
  static async index(req, res) {
    try {
      const brands = await BrandService.fetchAllBrands();
      if (!brands) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(brands)
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const brand = await BrandService.fetchBrandById(id);
      if (!brand) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(brand);
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async create(req, res) {
    try {
      const brand = await BrandService.create(req, res);
      if (brand) {
        res.status(200).json({message: "Brand created successfully."});
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
      BrandService.update(id, req).then(() => {
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
      await BrandService.delete(id);
      res.status(200).json({message: "Successfully Deleted."})
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }
}