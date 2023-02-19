const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const EmployerPost = mongoose.model("EmployerPost");
const WorkerPost = mongoose.model("WorkerPost");
const login = require("../middleware/login");
const data = require("../data/cities.json");

router.get("/categoryposts/:category", login, async (req, res) => {
	const category = req.params.category;
	await EmployerPost.find({ category})
		.then(async (employerPosts) => {
			await WorkerPost.find({ category })
				.then((workerPosts) => {
					const allPosts = [...workerPosts, ...employerPosts];
					res.json(allPosts);
				})
				.catch((err) => {
					console.log(err);
				});
			// res.json(employerPosts);
		})
		.catch((err) => {
			console.log(err);
		});
});
// router.get("/employercityposts/:city", login, async (req, res) => {
// 	const targetCity = req.params.city;
// 	await EmployerPost.find({ city: targetCity })
// 		.then((employerPosts) => {
// 			res.json(employerPosts);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });
// router.get("/categoryposts/:city", login, async (req, res) => {
// 	const category = req.params.category;
// 	await WorkerPost.find({ category })
// 		.then((workerPosts) => {
// 			res.json(workerPosts);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

module.exports = router;
