const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const EmployerPost = mongoose.model("EmployerPost");
const WorkerPost = mongoose.model("WorkerPost");
const User = mongoose.model("User");
const login = require("../middleware/login");

router.get("/allposts", login, async (req, res) => {
	const employerPosts = await EmployerPost.find({});
	const workerPosts = await WorkerPost.find({});
	const mixedData = [...employerPosts, ...workerPosts];
	const orderedData = mixedData.sort(
		(a, b) =>
			Number(a.lifeStamp.split(",").join("")) -
			Number(b.lifeStamp.split(",").join(""))
	);
	try {
		res.json({
			allPosts: orderedData,
			employerPosts,
			workerPosts,
		});
	} catch (e) {
		console.log(e);
	}
});

router.get("/posts/:postId", login, async (req, res) => {
	const employerPost = await EmployerPost.findOne({ id: req.params.postId });
	const workerPost = await WorkerPost.findOne({ id: req.params.postId });
	const targetPost = employerPost ? employerPost : workerPost;
	const user = await User.findById({ _id: targetPost.userId });
	try {
		console.log(user);
		res.json({ details: targetPost, user: user });
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
