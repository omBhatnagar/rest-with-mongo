const router = require("express").Router();

// Controllers
const { getAllUsers, deleteUser } = require("../controllers/user.controller");

// Get all users
router.get("/getallusers", getAllUsers);

// Delete user
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
