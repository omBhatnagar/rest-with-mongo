const router = require("express").Router();
const passport = require("../helpers/passport.google.oauth");

// Importing controllers
const {
	registerUserController,
	loginUserController,
} = require("../controllers/auth.controller");

// Register route
router.post("/register", registerUserController);

// Login route
router.post("/login", loginUserController);

// Login with Google
router.get("/login/federated/google", passport.authenticate("google"));
router.get(
	"/oauth2/redirect/google",
	passport.authenticate("google", {
		successRedirect: "/api/auth/",
		failureRedirect: "/login",
	}),
);
router.get("/", (req, res) => res.json(req.user));

// Log out from OAuth
router.get("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/api/testsession");
	});
});

module.exports = router;
