const Joi = require("joi");

const postSchema = Joi.object({
	title: Joi.string().required(),
	body: Joi.string(),
});

const updatePostSchema = Joi.object({
	title: Joi.string(),
	body: Joi.string(),
	postId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
});

const postIdValidation = Joi.object({
	postId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
});

module.exports = { postSchema, updatePostSchema, postIdValidation };
