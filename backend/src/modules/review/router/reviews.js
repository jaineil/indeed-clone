import express from "express";
import ReviewController from "../controller/reviews.js";

const reviewRouter = express.Router();

const reviewController = new ReviewController();

reviewRouter.post(
	"/job-seeker/company-details/add-review",
	reviewController.create
);

reviewRouter.put(
	"/job-seeker/company-details/helpfulness-count",
	reviewController.setHelpfulness
);

reviewRouter.get(
	"/employer/view-reviews",
	reviewController.viewReviewsAndRatings
);

reviewRouter.get(
	"/admin/search-company-admin",
	reviewController.searchCompanyAdmin
);

reviewRouter.get(
	"/admin/top-5-reviewed-companies/",
	reviewController.top5MostReviewedCompanies
);

reviewRouter.get("/admin/top-ceos", reviewController.topCEOs);

reviewRouter.get("/admin/get-review-requests", reviewController.getRequests);

reviewRouter.put("/admin/update-review", reviewController.updateRequest);


export default reviewRouter;
