import express from "express";
import JobController from "../controller/jobs.js";

const jobRouter = express.Router();

const jobController = new JobController();

jobRouter.post("/employer/postJob", jobController.create);

export default jobRouter;
