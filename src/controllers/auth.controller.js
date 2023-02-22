// Importing services
const {
	createUserService,
	loginUserService,
} = require("../services/auth.service");

// Helpers
const { ErrorHandler } = require("../helpers/error");

exports.registerUserController = async (req, res, next) => {
	const { name, email, password, role } = req.body;
	try {
		// Call service
		const serviceResponse = await createUserService({
			name,
			email,
			password,
			role,
		});

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(201).send({
			satus: serviceResponse.status,
			code: 201,
			body: serviceResponse.body.data,
			accessToken: serviceResponse.body.token,
		});
	} catch (error) {
		return next(error);
	}
};

exports.loginUserController = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		// Call service
		const serviceResponse = await loginUserService({ email, password });

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(200).send({
			status: serviceResponse.status,
			code: 200,
			accessToken: serviceResponse.body,
		});
	} catch (error) {
		return next(error);
	}
};
