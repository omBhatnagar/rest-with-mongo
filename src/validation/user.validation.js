const Joi = require("joi");

const userSchema = Joi.object({
	userName: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
	role: Joi.string(),
});

module.exports = userSchema;
