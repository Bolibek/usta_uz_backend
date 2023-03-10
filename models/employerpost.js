const { Schema, model } = require("mongoose");

const employerPostSchema = new Schema({
	id: String,
	status: String,
	createdAt: String,
	lifeStamp: String,
	userName: String,
	profileImage: String,
	jobName: String,
	category: String,
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
	postType: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

model("EmployerPost", employerPostSchema);
