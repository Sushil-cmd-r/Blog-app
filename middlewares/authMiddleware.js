const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check token
  if (token) {
    jwt.verify(token, "this is secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "this is secret", (err, decodedToken) => {
      if (!err) {
        //console.log(decodedToken);
        req.user = decodedToken?.id;
      }
    });
  }
  next();
};

module.exports = { requireAuth, checkUser };
