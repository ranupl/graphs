const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOD, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });