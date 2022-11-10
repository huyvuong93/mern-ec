const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomerService = require('../services/CustomerService');

const { SECRET = "secret" } = process.env;

module.exports = class AuthController {
  static async login(req, res) {
    try {
      // check if the user exists
      const customer = await CustomerService.fetchCustomerByEmail(req.body.email);
      if (customer) {
        //check if password matches
        const result = await bcrypt.compare(req.body.password, customer.password);
        if (result) {
          // sign token and send it in response
          const payload = {
            customer : {
              id: customer.id
            }
          }
          await jwt.sign(payload, SECRET,{ expiresIn: '30 days' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            });
        } else {
          res.status(400).json({error: "password doesn't match"});
        }
      } else {
        res.status(400).json({error: "User doesn't exist"});
      }
    } catch (error) {
      res.status(400).json({error});
    }
  }
}
