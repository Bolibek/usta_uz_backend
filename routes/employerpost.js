const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const EmployerPost = mongoose.model("EmployerPost");
const User = mongoose.model("User");
const login = require("../middleware/login");
const data = require("../data/cities.json");

router.get("/employerposts", login, async (req, res) => {
	await EmployerPost.find({})
		.then((employerPosts) => {
			res.json(employerPosts);
		})
		.catch((err) => {
			console.log(err);
		});
});

// router.get("/invoice", login, (req, res) => {
// 	Invoice.find({ userId: req.user._id })
// 		.then((invoice) => {
// 			res.json(invoice);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });
// router.get("/invoice/:invoiceId", login, (req, res) => {
// 	Invoice.findOne({ id: req.params.invoiceId })
// 		.then((invoice) => {
// 			res.json(invoice);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

router.post("/createemployerpost", login, async (req, res) => {
	console.log(req.body);

	try {
		const {
			id,
			createdAt,
			lifeStamp,
			jobName,
			category,
			extraInfo,
			startDate,
			comingHours,
			wage,
			phoneNumber,
			city,
			employerAddress,
			orientating,
			photoLinks,
			extraConditions,
		} = req.body;

		if (!jobName || !employerAddress || !phoneNumber) {
			return res
				.status(422)
				.json({ error: "Please fill in all required fields." });
		}
		const employee = await User.findOne({ _id: req.user._id });
		const employerPost = new EmployerPost({
			id,
			status: "created",
			createdAt,
			lifeStamp,
			userName: employee.firstName + " " + employee.lastName,
			profileImage: employee.profileImage,
			jobName,
			wage,
			phoneNumber,
			city,
			employerAddress,
			orientating,
			category,
			photoLinks: photoLinks
				? photoLinks
				: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
			extraInfo,
			startDate,
			comingHours,
			extraConditions,
			postType: "employer",
			userId: req.user._id,
		});

		await employerPost
			.save()
			.then((result) => {
				res.json({ invoice: result });
			})
			.catch((err) => {
				console.log(err, req.user);
			});
	} catch (err) {
		console.log(err, req.user);
		res.status(400).json({
			err: "Your request could not be processed. Please try again.",
		});
	}
});

router.put("/employerposts/:postId", login, (req, res) => {
	const {
		status,
		id,
		createdAt,
		lifeStamp,
		jobName,
		category,
		extraInfo,
		startDate,
		comingHours,
		wage,
		phoneNumber,
		city,
		employerAddress,
		orientating,
		photoLinks,
		extraConditions,
		userId,
	} = req.body;

	EmployerPost.findByIdAndUpdate(
		req.body._id,
		{
			status,
			id,
			createdAt,
			lifeStamp,
			jobName,
			category,
			extraInfo,
			startDate,
			comingHours,
			wage,
			phoneNumber,
			city,
			employerAddress,
			orientating,
			photoLinks,
			extraConditions,
			userId,
		},
		{
			new: true,
		}
	).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json(result);
		}
	});
});

router.delete("/employerposts/:postId", login, (req, res) => {
	Invoice.findOne({ id: req.params.invoiceId }).exec((err, invoice) => {
		if (err || !invoice) {
			return res.status(422).json({ error: err });
		}
		if (invoice.id.toString() === req.params.invoiceId) {
			invoice
				.remove()
				.then((result) => {
					res.json(result);
				})
				.catch((err) => console.log(err));
		}
	});
});

module.exports = router;
