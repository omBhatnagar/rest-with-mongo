const { v4: uuidv4 } = require("uuid");

// Model
const Post = require("../models/Post");

// Helpers
const { ErrorHandler } = require("../helpers/error");
const {
	postSchema,
	updatePostSchema,
	postIdValidation,
} = require("../validation/post.validation");

exports.createPostService = async (postData) => {
	try {
		// Validate fields
		const { value, error } = postSchema.validate(postData);
		if (error) {
			const errors = error.details.map((error) => error.message);
			return new ErrorHandler(400, errors);
		}

		// Get validated values
		const { title, body } = value;

		// Create new post
		const post = new Post({
			title,
			body,
		});

		// Save post
		const postToSave = await post.save();

		return { status: true, body: postToSave };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.getAllPostsService = async () => {
	try {
		// Fetch all posts
		const posts = await Post.find();
		return { status: true, body: posts };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.updatePostService = async (updatePostData) => {
	try {
		// Validate values
		const { value, error } = updatePostSchema.validate(updatePostData);
		if (error) {
			const errors = error.details.map((error) => error.message);
			return new ErrorHandler(400, errors);
		}

		// Get validated values
		const { title, body, postId } = value;

		// Check if post exists
		const post = await Post.findById(postId);
		if (post === null) return new ErrorHandler(404, "No post found.");

		// Update post
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: postId },
			{ title, body },
			{ new: true },
		);
		return { status: true, body: updatedPost };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.deletePostService = async (postId) => {
	try {
		// Validate postId
		const { value, error } = postIdValidation.validate({ postId });
		if (error) return new ErrorHandler(400, error.message);

		// Get validated id
		const validPostId = value.postId;

		// Check if post exists
		const post = await Post.findById(validPostId);
		console.log("DELETE", value);
		if (post === null) return new ErrorHandler(404, "Post not found.");

		// Delete post
		await Post.findByIdAndDelete(validPostId);
		return { status: true };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};
