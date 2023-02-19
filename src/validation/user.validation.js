const Joi = require("joi");

const userRegisterSchema = Joi.object({
	userName: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
	role: Joi.string(),
});

const userLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

module.exports = { userRegisterSchema, userLoginSchema };
