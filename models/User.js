const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter valid Name"],
    minlength: [3, "Minimum length is 3"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter valid Last Name"],
    minlength: [3, "Minimum length is 3"],
  },
  email: {
    type: String,
    required: [true, "Please enter an Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a Password"],
    minlength: [6, "Minmum Password length is 6 characters"],
  },
});

// fire a function before doc is saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
