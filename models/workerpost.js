const { Schema, model } = require("mongoose");

const workerPostSchema = new Schema({
	id: String,
	status: String,
	createdAt: String,
	lifeStamp: String,
	userName: String,
	profileImage: String,
	jobName: String,
	category: String,
	categoryType: String,
	material: String,
	photoLinks: String,
	extraSkills: String,
	startDate: String,
	comingHours: String,
	wage: String,
	phoneNumber: String,
	city: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

model("WorkerPost", workerPostSchema);
