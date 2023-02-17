const router = require("express").Router();

// Import routes
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

// Routes
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
