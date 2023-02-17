// Model
const Users = require("../models/User");

// Helpers
const { ErrorHandler } = require("../helpers/error");
const { hashPassword } = require("../helpers/encryptPassword");

// Joi schema
const userSchema = require("../validation/user.validation");

exports.createUserService = async (userData) => {
	try {
		// Validate user data
		const { value, error } = userSchema.validate(userData);
		if (error) {
			const errors = error.details.map((error) => error.message);
			return new ErrorHandler(404, errors);
		}

		// Get properties
		const { userName, email, password, role } = value;

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
