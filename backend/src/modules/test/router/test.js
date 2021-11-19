import express from "express";
import { TestController } from "../controller/test.js";

const testRouter = express.Router();
const testController = new TestController();

testRouter.get("/get-test-reviews", testController.fetch);
testRouter.get("/get-test-reviews-cache", testController.fetchFromCache);
testRouter.get("/insert-random-review", testController.insert10K);

export default testRouter;
