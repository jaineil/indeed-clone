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

	sendMessage = async (data) => {
		console.log(data);
		const time = new Date();
		const employerId = data.employerId;
		const jobSeekerId = data.jobSeekerId;
		const senderPersona = data.sender; // EMPLOYER or JOB_SEEKER
		const chatId = data.chatId;
		const messageText = data.message;
		let message;

		if (senderPersona === "JOB_SEEKER") {
			message = {
				senderId: jobSeekerId,
				receiverId: employerId,
				time: time.toISOString(),
				messageText: messageText,
			};
		}

		if (senderPersona === "EMPLOYER") {
			message = {
				senderId: employerId,
				receiverId: jobSeekerId,
				time: time.toISOString(),
				messageText: messageText,
			};
		}

		try {
			const response = await Chats.findByIdAndUpdate(chatId, {
				$push: { messages: message },
			});
			console.log(JSON.stringify(response));
			return this.responseGenerator(200, "Added new message to chat");
		} catch (err) {
			console.error(
				"Error when adding subsequent message to chat db ",
				err
			);
			return this.responseGenerator(
				400,
				"Error when adding subsequent message to chat db"
			);
		}
	};
}
