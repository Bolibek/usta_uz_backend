const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema({
	id: String,
	paymentDue: String,
	createdAt: String,
	description: String,
	paymentTerms: String,
	clientName: String,
	clientEmail: String,
	status: String,
	senderAddress: {
		street: String,
		city: String,
		postCode: String,
		country: String,
	},
	clientAddress: {
		street: String,
		city: String,
		postCode: String,
		country: String,
	},
	items: [
		{
			name: String,
			qty: Number,
			price: Number,
			id: Number,
			total: Number,
		},
	],
	total: Number,
	// userId: String,
	userId: {
	  type: Schema.Types.ObjectId,
	  ref: "User",
	},
});

model("Invoice", invoiceSchema);
