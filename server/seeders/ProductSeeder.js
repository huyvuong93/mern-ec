const { Product } = require("../models/Product");

module.exports = {
  run() {
    const data = {
      code: "T005",
      name: "Test Product 5",
      price: 123,
      detail: "Test Product detail"
    }

    new Product(data).save().then(() => {
      console.log("ProductSeeder has been completed");
    })
  }
}