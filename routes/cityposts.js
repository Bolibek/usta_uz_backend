const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const EmployerPost = mongoose.model("EmployerPost");
const WorkerPost = mongoose.model("WorkerPost");
const login = require("../middleware/login");
const data = require("../data/cities.json");

router.get("/cityposts:city", login, async (req, res) => {
	const targetCity = req.params.city;
	console.log("2q34" + targetCity);
	await EmployerPost.find({ city: req.params.city })
		.then((employerPosts) => {
			// console.log(employerPosts)
			res.json(employerPosts);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
