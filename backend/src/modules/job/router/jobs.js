import express from "express";
import JobController from "../controller/jobs.js";

const jobRouter = express.Router();

const jobController = new JobController();

jobRouter.post("/employer/postJob", jobController.create);
jobRouter.get("/employer/get-job-list", jobController.getJobList);

export default jobRouter;
