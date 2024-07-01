const blogRouter = require("express").Router();
const blogController = require("../controllers/blogController");

blogRouter.get("/", blogController.getAll);
blogRouter.post("/", blogController.createBlogListing);
blogRouter.delete("/:id", blogController.deleteBlogListing);
blogRouter.delete("/", blogController.deleteAllBlogListing);
blogRouter.put("/:id", blogController.updateBlogListing);

module.exports = blogRouter;
