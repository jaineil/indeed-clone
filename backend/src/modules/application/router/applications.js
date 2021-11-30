import express from "express";
import JobApplicationController from "../controller/applications.js";

const jobApplicationRouter = express.Router();
const jobApplicationController = new JobApplicationController();

jobApplicationRouter.post(
	"/job-seeker/job-details/apply",
	jobApplicationController.apply
);

jobApplicationRouter.get(
	"/employer/get-job-applicant-resume-cover-letter/:applicationId",
	jobApplicationController.getApplicantResumeCoverLetter
);

export default jobApplicationRouter;
