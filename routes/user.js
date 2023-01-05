const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const User = mongoose.model("User");

router.get("/user/:userId", login, (req, res) => {
	User.findOne({ _id: req.params.userId })
		.select("-password -_id -__v")
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			return res.status(404).json({ error: "user Not Found" });
		});
});
router.put("/user/:userId", login, (req, res) => {
	const {
		firstName,
		lastName,
		backgroundImage,
		profileImage,
	} = req.body;
	User.findByIdAndUpdate(
		req.params.userId,
		{
			firstName,
			lastName,
			backgroundImage,
			profileImage,
		},
		{ new: true }
	).exec((err, user) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json(user);
		}
	});
});

module.exports = router;
