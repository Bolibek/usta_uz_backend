const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/key");

router.post("/signupuser", async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!email) {
			return res
				.status(400)
				.json({ error: "You must enter an email address." });
		}

		if (!firstName || !lastName) {
			return res.status(400).json({ error: "You must enter your full name." });
		}

		if (!password) {
			return res.status(400).json({ error: "You must enter a password." });
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(400)
				.json({ error: "That email address is already in use." });
		}
		const hash = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			password: hash,
			firstName,
			lastName,
			backgroundImage: "",
			profileImage: "",
		});
		await user.save();
	} catch (error) {
		res.status(404).json({
			error: "Your request could not be processed. Please try again.",
		});
	}
});

router.post("/signinuser", async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			res
				.status(422)
				.json({ error: "Iltimos parol va email manzilingizni kiriting" });
		}

		await User.findOne({ email })
			.then((savedUser) => {
				if (!savedUser) {
					return res
						.status(422)
						.json({ error: "parol va email manzilingiz xato" });
				}
				const isMatch = bcrypt.compare(password, savedUser.password);
				const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
				const { _id } = savedUser;
				if (isMatch) {
					res.json({
						token: token,
						userId: _id,
					});
				} else {
					return res.status(422).json({ error: "Parolingiz xato" });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: "Your request could not be processed. Please try again.",
		});
	}
});

module.exports = router;
