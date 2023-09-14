const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const { BASE_URL } = process.env;

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      // default: `${BASE_URL}default-profile-pic.jpg`
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
