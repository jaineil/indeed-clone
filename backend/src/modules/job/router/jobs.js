import express from "express";
import JobController from "../controller/jobs.js";

const jobRouter = express.Router();

const jobController = new JobController();

jobRouter.post("/employer/postJob", jobController.create);
jobRouter.get("/employer/get-job-list/:employerId", jobController.getJobList);
jobRouter.get(
	"/job-seeker/showjobs/:companyId",
	jobController.showJobsByCompany
);
jobRouter.get("/job-seeker/job-details/:jobId", jobController.fetchJobDetails);
jobRouter.get(
	"/job-seeker/get-jobs-for-company",
	jobController.fetchJobsOfCompany
);

export default jobRouter;
