const User = require("../models/user");
const Blog = require("../models/blog");
require("express-async-errors");

const resetDatabase = async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  res.status(200).json({ message: "Database reset successfully" });
};

module.exports = { resetDatabase };
