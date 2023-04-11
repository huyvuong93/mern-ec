const bcrypt = require("bcryptjs");
const AdminService = require('../../services/AdminService');
const {expressLogger} = require("../../services/LogService");

module.exports = class AuthenticateController {
  static async login(req, res) {
    try {
      // check if the user exists
      const admin = await AdminService.fetchAdminByLoginId(req.body.login_id);
      if (admin) {
        //check if password matches
        const result = await bcrypt.compare(req.body.password, admin.password);
        if (result) {
          req.session.admin = admin;
          res.status(200).json({message: "Logged in!!"});
        } else {
          res.status(400).json({message: "Password or LoginId doesn't match"});
        }
      } else {
        res.status(400).json({message: "Admin doesn't exist"});
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(400).json({message: err.message});
    }
  }

  static async logout(req, res) {
    await req.session.destroy().catch(err => {
      expressLogger.error(err.message);
      throw new Error('System Error!');
    });
    res.end();
  }
}
