const { Tag } = require('../models/Product');
const { expressLogger } = require('../services/LogService')

module.exports = class TagService {
  static async fetchAllTags() {
    try {
      return await Tag.find();
    } catch (err) {
      expressLogger.error(err.message);
      console.log(err);
    }
  }

  static async fetchTagById(id) {
    try {
      return await Tag.findById(id);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async fetchTagByConditions(conditions) {
    try {
      return await Tag.findOne(...conditions);
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async create(req) {
    const tag = await new Tag(req.body).save();
    return !!tag;
  }

  static async update(id, req) {
    const data = req.body;

    try {
      return await Tag.updateOne({_id: id}, {$set: data});
    } catch (err) {
      expressLogger.error(err.message);
      return false;
    }
  }

  static async delete(id) {
    const tag = await this.fetchTagById(id);
    if (tag) {
      try {
        return await tag.deleteOne();
      } catch (err) {
        expressLogger.error(err.message);
        return false;
      }
    } else {
      throw new Error('Tag does not exist.')
    }
  }

};