// Model
const Users = require("../models/User");

// Helpers
const { ErrorHandler } = require("../helpers/error");

exports.getAllUsersService = async () => {
	try {
		// Fetch users
		const users = await Users.find();
		return { status: true, body: users };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.deleteUserService = async (_id) => {
	try {
		// Check if user exists
		const user = await Users.findById(_id);
		if (!user) return new ErrorHandler(404, "User does not exists.");

		// Delete user
		const userData = await Users.findByIdAndDelete(_id);
		return { status: true, body: userData };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};
