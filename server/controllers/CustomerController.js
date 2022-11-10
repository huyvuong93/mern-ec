const bcrypt = require("bcryptjs");
const CustomerService = require('../services/CustomerService');

module.exports = class CustomerController {
  static async index(req, res) {
    try {
      const customers = await CustomerService.fetchAllCustomers();
      if (!customers) {
        res.status(404).json("Not Found");
      } else {
        res.json(customers)
      }
    } catch (e) {
      res.status(500).json({error: e})
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const customer = await CustomerService.fetchCustomerById(id);
      if (!customer) {
        res.status(404).json("Not Found");
      } else {
        res.json(customer);
      }
    } catch (e) {
      res.status(500).json({error: e})
    }
  }

  static async create(req, res) {
    const errors = res.locals.errors;
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
      }
      try {
        await CustomerService.createNewCustomer(data);
        res.json({message: "Successfully Registered."})
      } catch (e) {
        res.status(500).json({error: e})
      }
    }
  }

  static update(req, res) {
    const id = req.params.id;
    try {
      CustomerService.updateCustomer(id, req.body).then(() => {
        res.json({ message: "Successfully Updated." })
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Successfully Failed. Please try again" })
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    try {
      await CustomerService.deleteCustomer(id);
      res.json({message: "Successfully Deleted."})
    } catch (e) {
      res.status(500).json({error: e})
    }
  }
}