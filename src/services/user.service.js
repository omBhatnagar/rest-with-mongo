// Model
const Users = require("../models/User");

// Helpers
const { ErrorHandler } = require("../helpers/error");
const { hashPassword } = require("../helpers/encryptPassword");

exports.createUserService = async (userName, email, password, role) => {
	try {
		// Check if fields are empty
		if (!userName || !email || !password)
			return new ErrorHandler(400, "Fields cannot be empty!");

		// Check if user's email already exists
		const isUser = await Users.findOne({ email }).exec();
		if (isUser)
			return new ErrorHandler(400, "Account with given email already exists.");

		// Encrypt password
		const encryptedPassword = hashPassword(password);

		// Create instance
		const user = new Users({
			userName,
			email,
			password: encryptedPassword,
			role,
		});

		// Save to database
		const userToSave = await user.save();
		return { status: true, body: userToSave };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};
