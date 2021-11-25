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
	}

	callback(null, results);
};

export default handleChatRequest;
