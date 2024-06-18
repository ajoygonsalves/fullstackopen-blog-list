const mongoose = require("mongoose");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const blogController = require("../controllers/blogController");

blogRouter.get("/", blogController.getAll);
blogRouter.post("/", blogController.createBlogListing);
blogRouter.delete("/:id", blogController.deleteBlogListing);
blogRouter.put("/:id", blogController.updateBlogListing);

module.exports = blogRouter;
