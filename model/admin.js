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

adminSchema.set("toJSON", {
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.__v;
  },
});

adminSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return console.log(error);
    bcrypt.hash(this.password, salt, (error, hash) => {
      this.password = hash;
      next();
    });
  });
});

adminSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (error, match) {
    if (error) return cb(false);
    if (match) return cb(true);
    cb(false);
  });
};

module.exports = mongoose.model("Admin", adminSchema);
