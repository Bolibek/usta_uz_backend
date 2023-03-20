const { Schema, model } = require("mongoose");

const workerPostSchema = new Schema({
	id: String,
	status: String,
	rating: Number,
	rater: Number,
	createdAt: String,
	lifeStamp: String,
	serviceName: String,
	userName: String,
	profileImage: String,
	jobName: String,
	category: String,
	photoLinks: String,
	extraSkills: String,
	startDate: String,
	comingHours: String,
	wage: String,
	phoneNumber: String,
	city: String,
	postType: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

model("WorkerPost", workerPostSchema);
