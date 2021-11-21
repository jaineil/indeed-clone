import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatsSchema = new Schema({
	employerId: { type: String },
	jobSeekerId: { type: String },
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
