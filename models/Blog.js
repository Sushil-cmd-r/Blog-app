const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createrId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    creater: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
