const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");

/*
https://stackoverflow.com/questions/21129989/internaloautherror-failed-to-obtain-access-token

Answer by Mythos on above link solved InternalOAuthError by making changes to node_modules oauth file
*/

// Import Users model
const Users = require("../models/User");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env["GOOGLE_CLIENT_ID"],
			clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
			callbackURL: "/api/auth/oauth2/redirect/google",
			scope: ["profile"],
		},
		async function verify(issuer, profile, cb) {
			try {
				let user = await Users.findById(profile.id);
				if (user) return cb(null, user);
				// Create user if not found in database
				user = new Users({
					_id: profile.id,
					name: profile.displayName,
				});
				await user.save();
				return cb(null, user);
			} catch (error) {
				return cb(error);
			}
		},
	),
);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username, name: user.name });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

module.exports = passport;
