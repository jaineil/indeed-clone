import express from "express";
import ReviewController from "../controller/reviews.js";

const reviewRouter = express.Router();

const reviewController = new ReviewController();

reviewRouter.post(
	"/job-seeker/company-details/add-review",
	reviewController.create
);

export default reviewRouter;
