const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const User = mongoose.model("User");
const EmployerPost = mongoose.model("EmployerPost");

router.get("/signeduserposts/:userId", login, (req, res) => {
	User.findOne({ _id: req.params.userId })
		.then(async () => {
			const userEmployerPosts = await EmployerPost.find({
				userId: req.params.userId,
			});
			const sortedPosts = userEmployerPosts.sort(
				(a, b) =>
					Number(a.lifeStamp.split(",").join("")) -
					Number(b.lifeStamp.split(",").join(""))
			);
			res.json(sortedPosts);
		})
		.catch((err) => {
			return res.status(404).json({ error: "user Not Found" });
		});
});

module.exports = router;
