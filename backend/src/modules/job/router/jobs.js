import express from "express";
import JobController from "../controller/jobs.js";

const jobRouter = express.Router();

const jobController = new JobController();

jobRouter.post("/employer/postJob", jobController.create);
jobRouter.get("/employer/get-job-list", jobController.getJobList);
jobRouter.get("/job-seeker/showjobs", jobController.showJobsByCompany);
jobRouter.get("/job-seeker/job-details/:jobId", jobController.fetchJobDetails);

export default jobRouter;
