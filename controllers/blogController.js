const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
require("express-async-errors");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const middleware = require("../utils/middleware");
const { default: mongoose } = require("mongoose");

const getAll = async (req, res) => {
  const all = await Blog.find({}).populate("user");

  res.status(200).json(all);
};

const createBlogListing = async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !author || !url) {
    return res
      .status(400)
      .json({ error: "Title, author, and URL are required" });
  }

  const user = req.user;
  const blog = new Blog({ title, author, url, likes: likes || 0, user });
  await blog.save();

  user.blogs = user.blogs.concat(blog.id);
  await user.save();

  res
    .status(201)
    .location(`${req.baseUrl}/` + blog.id)
    .json({ message: "Created listing successful", blog });

  logger.info({
    message: "Created listing successful",
    blog,
    user,
  });
};

const deleteBlogListing = async (req, res) => {
  const { id } = req.params;

  const user = req.user;
  const blogToBeDeleted = await Blog.findById(id);

  if (!blogToBeDeleted) {
    return res.status(404).json({ error: "Blog not found" });
  }

  console.log({ blogToBeDeleted: blogToBeDeleted.user.toString() });

  if (blogToBeDeleted.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  await Blog.findByIdAndDelete(id);

  user.blogs = user.blogs.filter((blogId) => blogId.toString() !== id);
  await user.save();

  res.status(200).json({ message: "Blog deleted successfully" });
  logger.info({ message: "Blog deleted successfully", id });
};

const deleteAllBlogListing = async (req, res) => {
  const blogToBeDeleted = await Blog.deleteMany({});

  const users = await User.find({});

  users.map((user) => ((user.blogs = []), user.save()));

  res.status(200).json({ message: "Blog deleted successfully" });
  logger.info({ message: "Blog deleted successfully", blogToBeDeleted });
};

const updateBlogListing = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (likes === undefined) {
    return res.status(400).json({ error: "Likes are required" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true, runValidators: true }
  );

  if (!updatedBlog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  logger.info({ message: "Blog updated successfully", updatedBlog });
};

module.exports = {
  getAll,
  createBlogListing,
  updateBlogListing,
  deleteBlogListing,
  deleteAllBlogListing,
};
