const Blog = require("../models/blog");
const logger = require("../utils/logger");

const getAll = async (req, res) => {
  try {
    const all = await Blog.find({});
    res.status(200).json(all);
  } catch (error) {
    logger.error("Error fetching blogs: ", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

const createBlogListing = async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !author || !url) {
    return res
      .status(400)
      .json({ error: "Title, author, and URL are required" });
  }

  const blog = new Blog({ title, author, url, likes: likes || 0 });

  try {
    await blog.save();

    res
      .status(201)
      .location(`${req.baseUrl}/` + blog.id)
      .json({ message: "Created listing successful", blog });

    logger.info({ message: "Created listing successful", blog });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to create blog listing" });
  }
};

module.exports = { getAll, createBlogListing };
