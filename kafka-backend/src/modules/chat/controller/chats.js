import Chats from "../../../db/models/mongo/chats.js";

export class ChatController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		message: message,
	});

	sendNewMessage = async (data) => {
		console.log(data);
		const time = new Date();
		const newMessage = new Chats({
			employerId: data.employerId,
			jobSeekerId: data.jobSeekerId,
			messages: [
				{
					senderId: data.employerId,
					receiverId: data.jobSeekerId,
					time: time.toISOString(),
					messageText: data.message,
				},
			],
		});

		try {
			const response = await newMessage.save();
			console.log(JSON.stringify(response));
			return this.responseGenerator(200, { chatId: response._id });
		} catch (err) {
			console.error("Error when adding new message to chat db ", err);
			return this.responseGenerator(
				400,
				"Error when adding new message to chat db"
			);
		}
	};
}
