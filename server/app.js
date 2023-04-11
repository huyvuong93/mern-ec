require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const WebRouter = require('./routes/Web');
const AdminRouter = require('./routes/Admin');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/static', express.static(`${__dirname}/uploads`));

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

mongoose.connect(process.env.DB.replace("<DB_PORT>", process.env.DB_PORT)).then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.log("Database error");
});

//web
app.use('/', WebRouter);

//admin
app.use('/admin', AdminRouter);

const privateKey = fs.readFileSync(`${__dirname}/key.pem`, 'utf8');
const certificate = fs.readFileSync(`${__dirname}/cert.pem`, 'utf8');

// Create a credentials object
const credentials = { key: privateKey, cert: certificate, passphrase: "huyvuong"};

// Create an HTTPS service with the Express app and the credentials
const httpsServer = https.createServer(credentials, app);

const httpsPort = process.env.PORT;
// Start the HTTPS server
httpsServer.listen(httpsPort, () => {
  console.log(`Example app listening at https://localhost:${httpsPort}`);
});