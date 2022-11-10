const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const customerRouter = require('./routes/Customer');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 30
  },
}));

app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://mongo:27017/mydb").then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.log("Database error");
});

app.use('/customer', customerRouter);

app.listen(3080);