import express from "express";
import ChatController from "../controller/chats.js";

const chatsRouter = express.Router();
const chatController = new ChatController();

chatsRouter.post("/employer/send-first-message", chatController.sendNewMessage);

export default chatsRouter;
