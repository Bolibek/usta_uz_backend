const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const EmployerPost = mongoose.model("EmployerPost");
const WorkerPost = mongoose.model("WorkerPost");
const User = mongoose.model("User");
const login = require("../middleware/login");
const data = require("../data/cities.json");

router.get("/allposts", login, async (req, res) => {
	const employerPosts = await EmployerPost.find({});
	const workerPosts = await WorkerPost.find({});
  const mixedData = [...employerPosts, ...workerPosts]
  const orderedData = mixedData.sort(
			(a, b) =>
				Number(a.lifeStamp.split(",").join("")) -
				Number(b.lifeStamp.split(",").join(""))
		);
	try {
		res.json({
      allPosts: orderedData,
      employerPosts,
      workerPosts
    });
	} catch (e) {
		console.log(e);
	}
});

// router.get("/invoice/:invoiceId", login, (req, res) => {
// 	Invoice.findOne({ id: req.params.invoiceId })
// 		.then((invoice) => {
// 			res.json(invoice);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });



module.exports = router;
