const CustomerModel = require('../models/Customer');

module.exports = class CustomerService {
  static async fetchAllCustomers() {
    try {
      return await CustomerModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchCustomerById(id) {
    try {
      return await CustomerModel.findById(id);
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchCustomerByEmail(email) {
    try {
      return await CustomerModel.findOne({"email": email});
    } catch (e) {
      console.log(e);
    }
  }

  static async createNewCustomer(data) {
    const newCustomer = {
      email: data.email,
      password: data.password,
      name: data.name,
      address : data.address,
      gender : data.gender
    }
    try {
      return await new CustomerModel(newCustomer).save();
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCustomer(id, data) {
    try {
      const result = await CustomerModel.updateOne({_id: id}, {$set: data});
      return !!result;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteCustomer(id) {
    const customer = await CustomerModel.findById(id);
    if (customer) {
      try {
        return await customer.deleteOne();
      } catch (e) {
        console.log(e);
      }
    } else {
      throw new Error('Customer does not exist.')
    }
  }
};