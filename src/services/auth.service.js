const jwt = require("jsonwebtoken");

// Model
const Users = require("../models/User");

// Helpers
const { ErrorHandler } = require("../helpers/error");
const { hashPassword, checkPassword } = require("../helpers/encryptPassword");

// Joi schema
const authSchema = require("../validation/user.validation");

exports.createUserService = async (userData) => {
	try {
		// Validate user data
		const { value, error } = authSchema.userRegisterSchema.validate(userData);
		if (error) {
			const errors = error.details.map((error) => error.message);
			return new ErrorHandler(404, errors);
		}

		// Get properties
		const { userName, email, password } = value;
		let { role } = value;

		// Set default value for role as user
		if (!role) role = "user";

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

		// Sign JWT
		const token = await jwt.sign(
			{
				email,
				role,
			},
			process.env.USER_JWT_SECRET,
		);
		return { status: true, body: { data: userToSave, token } };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.loginUserService = async (userData) => {
	try {
		// Validate credentials
		const { value, error } = authSchema.userLoginSchema.validate(userData);
		if (error) {
			const errors = error.details.map((error) => error.message);
			return new ErrorHandler(404, errors);
		}

		// Get properties
		const { email, password } = value;

		// Fetch user by email and check if they exist
		const user = await Users.findOne({ email }).exec();
		if (!user) return new ErrorHandler(404, "User with given email not found!");

		// Check passwords
		const validated = checkPassword(password, user.password);
		if (!validated) return new ErrorHandler(404, "Incorrect email/password.");

		// Sign JWT
		const token = await jwt.sign(
			{
				email,
				role: user.role,
			},
			process.env.USER_JWT_SECRET,
		);

		return { status: true, body: token };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};
