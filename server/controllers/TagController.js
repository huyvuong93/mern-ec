const TagService = require('../services/TagService');
const { expressLogger } = require('../services/LogService')

module.exports = class TagController {
  static async index(req, res) {
    try {
      const tags = await TagService.fetchAllTags();
      if (!tags) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(tags)
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const tag = await TagService.fetchTagById(id);
      if (!tag) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(tag);
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }

  static async create(req, res) {
    try {
      const tag = await TagService.create(req, res);
      if (tag) {
        res.status(200).json({message: "Tag created successfully."});
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
      TagService.update(id, req).then(() => {
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
      await TagService.delete(id);
      res.status(200).json({message: "Successfully Deleted."})
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({message: err.message})
    }
  }
}