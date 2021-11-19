import express from "express";
import { kafkaTestController } from "../controller/kafkaTestController.js";

const kafkaTestRouter = express.Router();

kafkaTestRouter.get("/get-test-reviews-kafka", kafkaTestController);

export default kafkaTestRouter;
