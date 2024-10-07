const blogRouter = require("express").Router();
const blogController = require("../controllers/blogController");

blogRouter.get("/", blogController.getAll);
blogRouter.post("/", blogController.createBlogListing);
blogRouter.post("/:id/comments", blogController.addComment);
blogRouter.get("/:id", blogController.getBlogById);
blogRouter.delete("/:id", blogController.deleteBlogListing);
blogRouter.delete("/", blogController.deleteAllBlogListing);
blogRouter.put("/:id", blogController.updateBlogListing);

module.exports = blogRouter;
