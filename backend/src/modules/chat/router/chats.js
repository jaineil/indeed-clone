import express from "express";
import ChatsController from "../controller/chats.js";

const chatsRouter = express.Router();
const chatsController = new ChatsController();

chatsRouter.post(
	"/employer/send-first-message",
	chatsController.sendNewMessage
);
chatsRouter.post("/employer/send-message", chatsController.sendMessage);
chatsRouter.get(
	"/job-seeker/get-messages/:jobSeekerId",
	chatsController.fetchChatsOverviewForJobSeeker
);
chatsRouter.get(
	"/employer/get-messages/:employerId",
	chatsController.fetchChatsOverviewForEmployer
);
chatsRouter.get(
	"/employer/get-chats/:employerId/:jobSeekerId",
	chatsController.fetchChatHistory
);

export default chatsRouter;
