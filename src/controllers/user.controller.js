// Import service
const {
	getAllUsersService,
	deleteUserService,
} = require("../services/user.service");

// Import helpers
const { ErrorHandler } = require("../helpers/error");

exports.getAllUsers = async (req, res, next) => {
	try {
		// Call service
		const serviceResponse = await getAllUsersService();

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(200).send({
			status: serviceResponse.status,
			code: 200,
			data: serviceResponse.body,
		});
	} catch (error) {
		return next(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		// Call service
		const serviceResponse = await deleteUserService(id);

		// Check if service returned error
		if (serviceResponse instanceof ErrorHandler) return next(serviceResponse);

		// Send response
		return res.status(200).send({
			status: serviceResponse.status,
			code: 200,
			message: "User deleted successfully.",
			data: serviceResponse.body,
		});
	} catch (error) {
		return next(error);
	}
};
