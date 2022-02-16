const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

// Initializing app
const app = express();

// middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");

const PORT = process.env.PORT ? process.env.PORT : 5000;

// connecting to database
const MONGO_URI = process.env.DB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(app.listen(PORT, console.log("App listening on port " + PORT)))
  .catch((err) => console.log(err));

// Routes
app.use(authRoutes);
app.use(blogRoutes);
