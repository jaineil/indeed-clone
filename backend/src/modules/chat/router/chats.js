import express from "express";
import ChatsController from "../controller/chats.js";

const chatsRouter = express.Router();
const chatsController = new ChatsController();

chatsRouter.post(
	"/employer/send-first-message",
	chatsController.sendNewMessage
);
chatsRouter.post("/employer/send-message", chatsController.sendMessage);

export default chatsRouter;
