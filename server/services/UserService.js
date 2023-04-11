const User = require('../models/User');

module.exports = class UserService {
  static async fetchAllUsers() {
    try {
      return await User.find();
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchUserById(id) {
    try {
      return await User.findById(id);
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchUserByEmail(email) {
    try {
      return await User.findOne({"email": email});
    } catch (e) {
      console.log(e);
    }
  }

  static async createNewUser(data) {
    try {
      return await new User(data).save();
    } catch (e) {
      console.log(e);
    }
  }

  static async updateUser(id, data) {
    try {
      const result = await User.updateOne({_id: id}, {$set: data});
      return !!result;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteUser(id) {
    const User = await User.findById(id);
    if (User) {
      try {
        return await User.deleteOne();
      } catch (e) {
        console.log(e);
      }
    } else {
      throw new Error('User does not exist.')
    }
  }
};