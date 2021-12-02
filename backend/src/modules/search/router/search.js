import express from "express";
import SearchController from "../controller/search.js";

const searchRouter = express.Router();
const search = new SearchController();

searchRouter.get(
	"/job-seeker/search-suggestions",
	search.searchJobsTitlesForAutocomplete
);
searchRouter.get("/job-seeker/search-jobs", search.searchJobs);
searchRouter.get("/job-seeker/search-salary-for-role", search.searchSalaries);
searchRouter.get("/job-seeker/search-for-companies", search.searchCompanies);
export default searchRouter;
