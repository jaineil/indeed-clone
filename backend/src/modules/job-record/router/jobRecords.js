import express from "express";
import JobRecordController from "../controller/jobRecords.js";

const jobRecordRouter = express.Router();

const jobRecordController = new JobRecordController();

jobRecordRouter.post("/job-seeker/add-new-salary", jobRecordController.create);

export default jobRecordRouter;
