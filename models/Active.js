const { Schema, model } = require("mongoose");

const activeSchema = new Schema({
	activeId: String
});

model("Active", activeSchema);
