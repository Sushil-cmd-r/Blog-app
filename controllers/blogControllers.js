const Blog = require("../models/Blog");
const User = require("../models/User");
const moment = require("moment");

module.exports.getAllBlogs = async (req, res) => {
  const user = req?.user;

  try {
    const result = await Blog.find().sort({ createdAt: -1 });
    res.render("index", {
      blogs: result,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.createBlog = async (req, res) => {
  const { title, snippet, text } = req.body;
  const user1 = await User.findOne({ _id: req?.user });
  const createrId = req?.user;
  const creater = user1.firstName + " " + user1.lastName;
  const newblog = {
    title,
    snippet,
    body: text,
    createrId,
    creater,
  };

  try {
    const blog = await Blog.create(newblog);
    res.status(201).json(blog);
  } catch (err) {
    console.log(err);
  }
};

module.exports.createPage = (req, res) => {
  const user = req?.user;
  res.render("create", { user });
};

module.exports.deleteBlog = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/" }))
    .catch((err) => console.log(err));
};

module.exports.getOneBlog = (req, res) => {
  const id = req.params.id;
  if (req.params.id === "favicon.ico") {
    return res.status(404);
  }
  const user = req?.user;
  Blog.findById(id)
    .then((result) => {
      const date = moment(result.createdAt).format("MMMM Do YYYY, h:mm:ss a");
      res.render("details", {
        blog: result,
        user,
        date,
      });
    })
    .catch((err) => console.log(err));
};
