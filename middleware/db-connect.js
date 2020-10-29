const mongoose = require("mongoose");
require('dotenv').config()
  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@projects.vhf01.mongodb.net/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
