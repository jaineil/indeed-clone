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
CompanyRouter.get("/admin/get-company", companyController.getCompany);
CompanyRouter.put("/employer/update-company", companyController.updateCompany);
CompanyRouter.get(
	"/admin/top-5-companies-average-rating",
	companyController.top5CompaniesByAverageRating
);
CompanyRouter.get(
	"/job-seeker/company-home/:companyId",
	companyController.fetchCompanySnapshot
);
CompanyRouter.get(
	"/job-seeker/company-details/join-us/:companyId",
	companyController.fetchCompanyWhyJoinUs
);
CompanyRouter.get(
	"/job-seeker/get-company-photos/:companyId",
	companyController.fetchPhotos
);
CompanyRouter.get(
	"/job-seeker/get-salaries-by-company-id/:companyId",
	companyController.fetchCompanySalaries
);
CompanyRouter.post("/job-seeker/add-company-view", companyController.addClick);

CompanyRouter.get("/job-seeker/top-10-viewed-companies", companyController.top10CompaniesDailyClicks);

export default CompanyRouter;
