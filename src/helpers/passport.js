const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.USER_JWT_SECRET,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (user, done) => {
			try {
				return done(null, user);
			} catch (error) {
				done(
					{
						status: false,
						code: 401,
						message: "Access denied.",
						error: error,
					},
					false,
				);
			}
		},
	),
);

module.exports = passport;
