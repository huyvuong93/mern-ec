const CategoryService = require('../services/CategoryService');
const { expressLogger } = require('../services/LogService')

module.exports = class CategoryController {
  static async index(req, res) {
    try {
      const categories = await CategoryService.fetchAllCategories();
      if (!categories) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(categories)
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const category = await CategoryService.fetchCategoryById(id);
      if (!category) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(category);
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async create(req, res) {
    try {
      const category = await CategoryService.create(req, res);
      if (category) {
        res.status(200).json({message: "Category created successfully."});
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
      CategoryService.update(id, req).then(() => {
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
      await CategoryService.delete(id);
      res.status(200).json({message: "Successfully Deleted."})
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }
}