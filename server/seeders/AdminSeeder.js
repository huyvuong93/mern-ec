const Admin = require("../models/Admin");

module.exports = {
  run() {
    const data = [
      {
        login_id: "admin",
        password: "admin",
        name: "Administrator",
        role: "super"
      },
      {
        login_id: "staff",
        password: "staff",
        name: "Staff",
        role: "staff"
      },
    ]

    Admin.insertMany(data).then(() => {
      console.log("AdminSeeder has been completed");
    })
  }
}