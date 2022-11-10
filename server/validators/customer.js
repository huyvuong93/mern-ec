const { body, validationResult } = require("express-validator");
const CustomerService = require('../services/CustomerService');

exports.CustomerValidator = [
  body('email', 'Invalid email.').isEmail(),
  body('email').custom((value) => {
    return CustomerService.fetchCustomerByEmail(value).then((customer) => {
      if (customer) {
        return Promise.reject('Email already in use.');
      }
    });
  }),
  body('password', 'The password must be 5+ chars long and contain a number')
  .isLength({ min: 5 }),
  body('name', 'Name is required.')
  .trim()
  .isLength({min: 5})
  .escape(),
  body('gender').custom((value) => {
    if (!['Male', 'Female'].includes(value)) {
      return Promise.reject('Gender is required.')
    }
  }),
  (req, res, next) => {
    res.locals.errors = validationResult(req);
    next();
  }
]