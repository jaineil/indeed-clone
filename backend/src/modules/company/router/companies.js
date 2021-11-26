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

export default CompanyRouter;
