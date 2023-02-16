// Model
const Users = require("../models/User");

// Helpers
const { ErrorHandler } = require("../helpers/error");

exports.createUserService = async (userName, email, password, role) => {
	try {
		// Check if fields are empty
		if (!userName || !email || !password)
			return new ErrorHandler(400, "Fields cannot be empty!");

		// Create instance
		const user = new Users({
			userName,
			email,
			password,
			role,
		});

		// Save to database
		const userToSave = await user.save();
		return { status: true, body: userToSave };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};
