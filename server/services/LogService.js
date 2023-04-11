const log4js = require("log4js");
log4js.configure({
  appenders: {
    express: {
      type: "dateFile",
      filename: `${__dirname}/../logs/express.log`,
      maxLogSize: 50000000,
      backups: 5
    }
  },
  categories: {
    default: {
      appenders: ["express"],
      level: "ALL"
    }
  },
});

const expressLogger = log4js.getLogger("express");

module.exports = { expressLogger }