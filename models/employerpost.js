const { Schema, model } = require("mongoose");

const employerPostSchema = new Schema({
	id: String,
	status: String,
	createdAt: String,
	lifeStamp: String,
	userName: String,
	jobName: String,
	section: String,
	category: String,
	categoryType: String,
	material: String,
	photoLinks: String,
	extraInfo: String,
	startDate: String,
	comingHours: String,
	wage: String,
	city: String,
	employerAddress: String,
	orientating: String,
	phoneNumber: String,
	extraConditions: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

model("EmployerPost", employerPostSchema);
