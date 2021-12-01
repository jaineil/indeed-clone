import express from "express";
import JobSeekerController from "../controller/job-seekers.js";

const jobseekerRouter = express.Router();

const jobseekerController = new JobSeekerController();

jobseekerRouter.get("/job-seeker/get-profile", jobseekerController.getprofile);
jobseekerRouter.put(
  "/job-seeker/update-profile",
  jobseekerController.updateprofile
);
jobseekerRouter.put("/job-seeker/unsave-job", jobseekerController.unsaveJob);
jobseekerRouter.post("/job-seeker/upload-resume", jobseekerController.uploadResume);
jobseekerRouter.put("/job-seeker/delete-resume", jobseekerController.deleteResume);
jobseekerRouter.get("/job-seeker/get-profile", jobseekerController.getprofile);
jobseekerRouter.put("/job-seeker/update-profile",jobseekerController.updateprofile);
jobseekerRouter.post("/job-seeker/save-job", jobseekerController.saveJob);
export default jobseekerRouter;
