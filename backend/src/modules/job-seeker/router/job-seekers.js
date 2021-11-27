import express from "express";
import JobSeekerController from "../controller/job-seekers.js";

const jobseekerRouter = express.Router();

const jobseekerController = new JobSeekerController();

jobseekerRouter.get("/job-seeker/get-profile",jobseekerController.getprofile);
jobseekerRouter.put("/job-seeker/update-profile", jobseekerController.updateprofile)

export default jobseekerRouter;
