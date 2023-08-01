const { Category } = require('../models/Product');
const { expressLogger } = require('../services/LogService')

module.exports = class CategoryService {
  static async fetchAllCategories() {
    try {
      return await Category.find();
    } catch (err) {
      expressLogger.error(err.message);
      console.log(err);
    }
  }

  static async fetchCategoryById(id) {
    try {
      return await Category.findById(id);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async fetchCategoryByConditions(conditions) {
    try {
      return await Category.findOne(...conditions);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async create(req) {
    const category = await new Category(req.body).save();
    return !!category;
  }

  static async update(id, req) {
    const data = req.body;

    try {
      return await Category.updateOne({_id: id}, {$set: data});
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async delete(id) {
    const category = await this.fetchCategoryById(id);
    if (category) {
      try {
        return await category.deleteOne();
      } catch (err) {
        expressLogger.error(err.message);
        return false;
      }
    } else {
      throw new Error('category does not exist.')
    }
  }

};