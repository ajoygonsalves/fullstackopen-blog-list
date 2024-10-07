const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// ... existing routes ...

router.post("/:id/comments", blogController.addComment);
router.get("/:id/comments", blogController.getComments);

module.exports = router;
