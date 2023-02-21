const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userName: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	role: String,
});

module.exports = mongoose.model("Users", userSchema);
