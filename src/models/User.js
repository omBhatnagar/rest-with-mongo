const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		required: true,
		type: String,
	},
	email: String,
	password: String,
	role: String,
});

module.exports = mongoose.model("Users", userSchema);
