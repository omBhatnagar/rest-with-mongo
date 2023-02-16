// Import service

const { ErrorHandler } = require("../helpers/error");
const { createUserService } = require("../services/user.service");

exports.createUser = async (req, res, next) => {
	const { userName, email, password, role } = req.body;
	try {
		// Call service
		const serviceResponse = await createUserService(
			userName,
			email,
			password,
			role,
		);

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(201).send({
			satus: serviceResponse.status,
			code: 201,
			body: serviceResponse.body,
		});
	} catch (error) {
		return next(error);
	}
};
