import express from "express";
import { TestController } from "../controller/test.js";

const testRouter = express.Router();
const testController = new TestController();

testRouter.get("/get-test-reviews", testController.fetch);

export default testRouter;
