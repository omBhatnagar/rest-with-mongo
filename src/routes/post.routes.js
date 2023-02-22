const router = require("express").Router();

// Controllers
const {
	createPostController,
	getAllPostsController,
	updatePostController,
	deletePostController,
} = require("../controllers/post.controller");

// Create post
router.post("/post", createPostController);

// Get all posts
router.get("/", getAllPostsController);

// Update post
router.put("/:postId", updatePostController);

// Delete post
router.delete("/:postId", deletePostController);

module.exports = router;
