const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const { JWT_SECRET } = require("./keys");

const User = mongoose.model("User");
const secret = JWT_SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
	new JwtStrategy(opts, (payload, done) => {
		User.findById(payload._id)
			.then((user) => {
				if (user) {
					return done(null, user);
				}

				return done(null, false);
			})
			.catch((err) => {
				return done(err, false);
			});
	})
);
