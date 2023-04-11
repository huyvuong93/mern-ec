const mongoose = require("mongoose");
const AdminSeeder = require("./AdminSeeder");

const connect = () => {
  mongoose.connect("mongodb://mongo:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Database connected!"))
  .catch(err => console.log(err));
}

const call = () => {
  const arguments = process.argv.slice(2);
  console.log(arguments)
  if (arguments) {
    arguments.forEach((argument) => {
      const seeder = require(`./${argument}`)
      seeder.run();
    })
  } else {
    AdminSeeder.run();
  }
  process.exit();
}

connect();
call();
