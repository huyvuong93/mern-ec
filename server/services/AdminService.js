const Admin = require('../models/Admin');

module.exports = class AdminService {
  static async fetchAdminByLoginId(id) {
    try {
      return await Admin.findOne({login_id: id});
    } catch (e) {
      console.log(e);
    }
  }
};