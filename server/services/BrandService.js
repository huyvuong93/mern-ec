const { Brand } = require('../models/Product');
const { expressLogger } = require('../services/LogService')

module.exports = class BrandService {
  static async fetchAllBrands() {
    try {
      return await Brand.find();
    } catch (err) {
      expressLogger.error(err.message);
      console.log(err);
    }
  }

  static async fetchBrandById(id) {
    try {
      return await Brand.findById(id);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async fetchBrandByConditions(conditions) {
    try {
      return await Brand.findOne(...conditions);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async create(req) {
    const brand = await new Brand(req.body).save();
    return !!brand;
  }

  static async update(id, req) {
    const data = req.body;

    try {
      return await Brand.updateOne({_id: id}, {$set: data});
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async delete(id) {
    const brand = await this.fetchBrandById(id);
    if (brand) {
      try {
        return await Brand.deleteOne();
      } catch (err) {
        expressLogger.error(err.message);
        return false;
      }
    } else {
      throw new Error('Brand does not exist.')
    }
  }

};