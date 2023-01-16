const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const WorkerPost = mongoose.model("WorkerPost");
const User = mongoose.model("User");
const login = require("../middleware/login");

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

router.post("/createworkerpost", login, async (req, res) => {
	console.log(req.body);
	let worker;
	await User.findOne({ _id: req.user._id }).then((savedUser) => {
		worker = savedUser;
	});
	try {
		const {
			id,
			createdAt,
			lifeStamp,
			serviceName,
			category,
			categoryType,
			material,
			extraSkills,
			startDate,
			comingHours,
			wage,
			phoneNumber,
			section,
			photoLinks,
		} = req.body;

		// !startDate ||
		// !comingHours ||
		if (!serviceName || !phoneNumber) {
			return res
				.status(422)
				.json({ error: "Please fill in all required fields." });
		}
		const employerPost = new WorkerPost({
			id,
			status: "created",
			createdAt,
			lifeStamp,
			userName: worker.firstName + " " + worker.lastName,
			serviceName,
			section,
			category,
			categoryType,
			material,
			photoLinks: photoLinks? photoLinks : "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
			extraSkills,
			startDate,
			comingHours,
			wage,
			phoneNumber,
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

// router.put("/invoice/:invoiceId", login, (req, res) => {
// 	const {
// 		status,
// 		paymentDue,
// 		paymentTerms,
// 		clientAddress,
// 		clientEmail,
// 		clientName,
// 		senderAddress,
// 		description,
// 		items,
// 		userId,
// 	} = req.body;
// 	let total = null;

// 	items.forEach((item) => {
// 		total = total + item.total;
// 	});
// 	Invoice.findByIdAndUpdate(
// 		req.body._id,
// 		{
// 			status,
// 			paymentDue,
// 			paymentTerms,
// 			clientAddress,
// 			clientEmail,
// 			clientName,
// 			senderAddress,
// 			description,
// 			items,
// 			total,
// 			userId,
// 		},
// 		{
// 			new: true,
// 		}
// 	).exec((err, result) => {
// 		if (err) {
// 			return res.status(422).json({ error: err });
// 		} else {
// 			res.json(result);
// 		}
// 	});
// });

// router.delete("/invoice/:invoiceId", login, (req, res) => {
// 	Invoice.findOne({ id: req.params.invoiceId }).exec((err, invoice) => {
// 		if (err || !invoice) {
// 			return res.status(422).json({ error: err });
// 		}
// 		if (invoice.id.toString() === req.params.invoiceId) {
// 			invoice
// 				.remove()
// 				.then((result) => {
// 					res.json(result);
// 				})
// 				.catch((err) => console.log(err));
// 		}
// 	});
// });

module.exports = router;
