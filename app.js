const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const MONGO_URI =
  "mongodb+srv://sushil:sushil1569@cluster0.hoqvj.mongodb.net/authentication?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(app.listen(5000, console.log("App listening on port 5000")))
  .catch((err) => console.log(err));

app.use(authRoutes);
app.use(blogRoutes);
