const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const User = mongoose.model("User");
const EmployerPost = mongoose.model("EmployerPost");
const WorkerPost = mongoose.model("WorkerPost");

router.get("/signeduserposts/:userId", login, (req, res) => {
	User.findOne({ _id: req.params.userId })
		.then(async () => {
	    const userEmployerPosts = await EmployerPost.find({userId: req.params.userId})
	    const userWorkerPosts = await WorkerPost.find({userId: req.params.userId})
	    const allUserPosts = [...userEmployerPosts, ...userWorkerPosts].sort((a, b) => Number(a.lifeStamp.split(",").join("")) - Number(b.lifeStamp.split(",").join("")));
			res.json(allUserPosts);
		})
		.catch((err) => {
			return res.status(404).json({ error: "user Not Found" });
		});
	// EmployerPost.find({ userId: req.params.userId }).then((posts) => {
  //   res.json(posts);
  //   // console.log(posts, req.params.userId);
  // }).catch((err) => {
  //   console.log(err);
  // });
});

module.exports = router;
