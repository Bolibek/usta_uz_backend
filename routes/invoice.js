const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const Invoice = mongoose.model("Invoice");
const login = require("../middleware/login");

router.get("/invoice", login, (req, res) => {
	Invoice.find({userId: req.user._id})
		.then((invoice) => {
			res.json(invoice);
		})
		.catch((err) => {
			console.log(err);
		});
});
router.get("/invoice/:invoiceId", login, (req, res) => {
	Invoice.findOne({ id: req.params.invoiceId })
		.then((invoice) => {
			res.json(invoice);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/createinvoice", login, async (req, res) => {
	console.log(req.body);
	try {
		const {
			id,
			status,
			clientName,
			clientEmail,
			paymentDue,
			createdAt,
			paymentTerms,
			description,
			senderAddress,
			clientAddress,
			items,
		} = req.body;
		let total = null;

		items.forEach((item) => {
			total = total + item.total;
		});

		if (
			!paymentDue ||
			!paymentTerms ||
			!description ||
			!clientName ||
			!clientEmail
		) {
			return res
				.status(422)
				.json({ error: "Please fill in all required fields." });
		}
		const invoice = new Invoice({
			id,
			status,
			clientName,
			clientEmail,
			paymentDue,
			createdAt,
			paymentTerms,
			description,
			senderAddress: {
				street: senderAddress.street,
				city: senderAddress.city,
				postCode: senderAddress.postCode,
				country: senderAddress.country,
			},
			clientAddress: {
				street: clientAddress.street,
				city: clientAddress.city,
				postCode: clientAddress.postCode,
				country: clientAddress.country,
			},
			items,
			total,
			userId: req.user._id,
		});

		await invoice
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

router.put("/invoice/:invoiceId", login, (req, res) => {
	const {
		status,
		paymentDue,
		paymentTerms,
		clientAddress,
		clientEmail,
		clientName,
		senderAddress,
		description,
		items,
		userId,
	} = req.body;
	let total = null;

	items.forEach((item) => {
		total = total + item.total;
	});
	Invoice.findByIdAndUpdate(
		req.body._id,
		{
			status,
			paymentDue,
			paymentTerms,
			clientAddress,
			clientEmail,
			clientName,
			senderAddress,
			description,
			items,
			total,
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

router.delete("/invoice/:invoiceId", login, (req, res) => {
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
