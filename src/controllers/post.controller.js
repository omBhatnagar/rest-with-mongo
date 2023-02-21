// Import helpers
const { ErrorHandler } = require("../helpers/error");
const {
	createPostService,
	getAllPostsService,
	updatePostService,
	deletePostService,
} = require("../services/post.service");

exports.createPostController = async (req, res, next) => {
	const { title, body } = req.body;
	try {
		// Call service
		const serviceResponse = await createPostService({ title, body });

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(201).send({
			status: serviceResponse.status,
			code: 201,
			body: serviceResponse.body,
		});
	} catch (error) {
		return next(error);
	}
};

exports.getAllPostsController = async (req, res, next) => {
	try {
		// Call service
		const serviceResponse = await getAllPostsService();

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		res.status(200).send({
			status: serviceResponse.status,
			code: 200,
			data: serviceResponse.body,
		});
	} catch (error) {
		return next(error);
	}
};

exports.updatePostController = async (req, res, next) => {
	const { postId } = req.params;
	const { title, body } = req.body;
	try {
		// Call service
		const serviceResponse = await updatePostService({ postId, title, body });

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(201).send({
			status: serviceResponse.status,
			code: 201,
			data: serviceResponse.body,
		});
	} catch (error) {
		return next(error);
	}
};

exports.deletePostController = async (req, res, next) => {
	const { postId } = req.params;
	try {
		// Call service
		const serviceResponse = await deletePostService(postId);

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(200).send({
			status: serviceResponse.status,
			code: 200,
			message: "Post deleted.",
		});
	} catch (error) {
		return next(error);
	}
};
