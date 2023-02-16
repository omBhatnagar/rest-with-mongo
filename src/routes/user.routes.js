const router = require("express").Router();

// Controllers
const { createUser } = require("../controllers/user.controller");

// Create user
router.post("/createuser", createUser);

module.exports = router;
