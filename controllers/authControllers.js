const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { firstName: "", lastName: "", email: "", password: "" };

  // log in errors
  if (err.message === "Incorrect Email") {
    errors.email = "Email not registered";
  } else if (err.message === "Incorrect Password") {
    errors.password = "Incorrect Password";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is Already registered";
    return errors;
  }

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// Controllers
module.exports.signup_get = (req, res) => {
  const user = req?.user;
  res.render("signup", { user });
};

module.exports.login_get = (req, res) => {
  const user = req?.user;
  res.render("login", { user });
};

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
