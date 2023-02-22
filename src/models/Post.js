const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: {
		required: true,
		type: String,
	},
	body: String,
});

module.exports = mongoose.model("Posts", postSchema);
