const router = require("express").Router();

// Controllers
const { getAllUsers, deleteUser } = require("../controllers/user.controller");

// Get all users
router.get("/", getAllUsers);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
