const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

const connectDB = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("DB connected successfully");
};

module.exports = connectDB;
