const router = require("express").Router();

// Importing controllers
const {
	registerUserController,
	loginUserController,
} = require("../controllers/auth.controller");

// Register route
router.post("/register", registerUserController);

// Login route
router.post("/login", loginUserController);

module.exports = router;
