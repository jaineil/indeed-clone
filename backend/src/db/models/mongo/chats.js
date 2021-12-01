import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatsSchema = new Schema({
	employerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "employerDetail",
	},
	employerName: { type: String },
	jobSeekerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "jobSeekerDetail",
	},
	jobSeekerName: { type: String },
	messages: [
		{
			senderId: { type: String },
			receiverId: { type: String },
			timestamp: { type: String },
			messageText: { type: String },
		},
	],
});

const Chats = mongoose.model("chat", chatsSchema);

export default Chats;
