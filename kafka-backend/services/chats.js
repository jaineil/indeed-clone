import { ChatController } from "../src/modules/chat/controller/chats.js";

const handleChatRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const chatController = new ChatController();
	let results;

	switch (req.path) {
		case "/employer/send-first-message":
			results = await chatController.sendNewMessage(req.body);
			break;

		case "/employer/send-message":
			results = await chatController.sendMessage(req.body);
			break;

		case "/job-seeker/get-messages/:jobSeekerId":
			results = await chatController.fetchChatsOverviewForJobSeeker(
				req.body
			);
			break;

		case "/employer/get-messages/:employerId":
			results = await chatController.fetchChatsOverviewForEmployer(
				req.body
			);
			break;
		case "/employer/get-chats/:employerId/:jobSeekerId":
			results = await chatController.fetchChatHistory(req.body);
	}

	callback(null, results);
};

export default handleChatRequest;
