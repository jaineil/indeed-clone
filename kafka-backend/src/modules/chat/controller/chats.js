import Chats from "../../../db/models/mongo/chats.js";
import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";
import EmployerDetails from "../../../db/models/mongo/employerDetails.js";

export class ChatController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

	sendNewMessage = async (data) => {
		console.log(data);
		const employerId = data.employerId;
		const jobSeekerId = data.jobSeekerId;
		let employerName;
		let jobSeekerName;

		try {
			const employerDetails = await EmployerDetails.findById(employerId);
			employerName = employerDetails.firstName + employerDetails.lastName;
		} catch (err) {
			console.error("Error when fetching employer details ", err);
			return this.responseGenerator(
				404,
				"Error when fetching employer details"
			);
		}

		try {
			const jobSeekerDetails = await JobSeekerDetails.findById(
				jobSeekerId
			);
			jobSeekerName =
				jobSeekerDetails.firstName + jobSeekerDetails.lastName;
		} catch (err) {
			console.error("Error when fetching job-seeker details ", err);
			return this.responseGenerator(
				404,
				"Error when fetching job-seeker details"
			);
		}

		const time = new Date();
		const newMessage = new Chats({
			employerId: data.employerId,
			employerName: employerName,
			jobSeekerId: data.jobSeekerId,
			jobSeekerName: jobSeekerName,
			messages: [
				{
					senderId: data.employerId,
					receiverId: data.jobSeekerId,
					timestamp: time.toISOString(),
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
				timestamp: time.toISOString(),
				messageText: messageText,
			};
		}

		if (senderPersona === "EMPLOYER") {
			message = {
				senderId: employerId,
				receiverId: jobSeekerId,
				timestamp: time.toISOString(),
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

	fetchChatsOverviewForJobSeeker = async (data) => {
		console.log(data);
		const jobSeekerId = data.jobSeekerId;
		let res = [];
		try {
			const response = await Chats.find({
				jobSeekerId: jobSeekerId,
			}).slice("messages", -1);

			console.log("chat response",JSON.stringify(response));

			for (const k of response) {
				const messageOverview = {
					employerId: k.employerId,
					employerName: k.employerName,
					lastMessage: k.messages[0].messageText,
					timestamp: k.messages[0].timestamp,
					chatId: k._id
				};

				res.push(messageOverview);
			}

			return this.responseGenerator(200, { messages: res });
		} catch (err) {
			console.error(
				"Could not fetch chats overview for job-seeker ",
				err
			);
			return this.responseGenerator(
				404,
				"Could not fetch chats overview for job-seeker"
			);
		}
	};

	fetchChatsOverviewForEmployer = async (data) => {
		console.log(data);
		const employerId = data.employerId;
		let res = [];
		try {
			const response = await Chats.find({
				employerId: employerId,
			}).slice("messages", -1);

			console.log(JSON.stringify(response));

			for (const k of response) {
				console.log(k)
				const messageOverview = {
					jobSeekerId: k.jobSeekerId,
					jobSeekerName: k.jobSeekerName,
					lastMessage: k.messages[0].messageText,
					timestamp: k.messages[0].timestamp,
					chatId: k._id
				};

				res.push(messageOverview);
			}

			return this.responseGenerator(200, { messages: res });
		} catch (err) {
			console.error(
				"Could not fetch chats overview for job-seeker ",
				err
			);
			return this.responseGenerator(
				404,
				"Could not fetch chats overview for job-seeker"
			);
		}
	};

	fetchChatHistory = async (data) => {
		console.log(data);
		const employerId = data.employerId;
		const jobSeekerId = data.jobSeekerId;

		let res = [];
		let sender;

		try {
			const response = await Chats.findOne({
				employerId: employerId,
				jobSeekerId: jobSeekerId,
			});
			console.log(JSON.stringify(response));
			const messages = response.messages;
			for (const message of messages) {
				if (message.senderId === employerId) {
					sender = "EMPLOYER";
				} else {
					sender = "JOB_SEEKER";
				}
				const chat = {
					sender: sender,
					text: message.messageText,
					timestamp: message.timestamp,
				};

				res.push(chat);
			}
			return this.responseGenerator(200, { chats: res });
		} catch (err) {
			console.error("Could not fetch chat history ", err);
			return this.responseGenerator(404, "Could not fetch chat history");
		}
	};
}
