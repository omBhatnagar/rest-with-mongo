const router = require("express").Router();
const passport = require("../helpers/passport");

// Import routes
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

// Routes
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

// Test protected route
router.get(
	"/testprotected",
	passport.authenticate("jwt", { session: false }),
	(req, res) => res.json("THIS IS A PROTECTED ROUTE"),
);
router.get("/testsession", (req, res) => res.json({ user: req.user }));

module.exports = router;
