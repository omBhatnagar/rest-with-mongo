const router = require("express").Router();

// Controllers
const {
	createUser,
	getAllUsers,
	deleteUser,
} = require("../controllers/user.controller");

// Create user
router.post("/createuser", createUser);

// Get all users
router.get("/getallusers", getAllUsers);

// Delete user
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
