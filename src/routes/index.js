const router = require("express").Router();

// Import user routes
const userRoutes = require("./user.routes");

// Routes
router.use("/user", userRoutes);

module.exports = router;
