const UserService = require('../services/UserService');
const { expressLogger } = require('../services/LogService')

module.exports = class UserController {
  static async show(req, res) {
    const id = req.params.id;
    try {
      const user = await UserService.fetchUserById(id);
      if (!user) {
        res.status(404).json("Not Found");
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      expressLogger.error(err.message)
      res.status(500).json({ message: err.message})
    }
  }

  static update(req, res) {
    const id = req.params.id;
    try {
      UserService.updateUser(id, req.body).then(() => {
        res.json({ message: "Successfully Updated." })
      }).catch((err) => {
        expressLogger.error(err.message);
        res.status(500).json({ message: "Failed. Please try again" })
      });
    } catch (err) {
      expressLogger.error(err.message);
      res.status(500).json({ message: "Failed. Please try again" })
    }
  }
}