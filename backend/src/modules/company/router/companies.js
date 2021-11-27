import express from "express";
import CompanyController from "../controller/companies.js";

const CompanyRouter = express.Router();

const companyController = new CompanyController();

CompanyRouter.post("/employer/createCompany", companyController.create);
CompanyRouter.post(
	"/employer/post-featured-review",
	companyController.postFeaturedReview
);
CompanyRouter.get("/admin/get-companies", companyController.getAllCompanies);
CompanyRouter.get(
	"/admin/top-5-companies-average-rating",
	companyController.top5CompaniesByAverageRating
);

export default CompanyRouter;
