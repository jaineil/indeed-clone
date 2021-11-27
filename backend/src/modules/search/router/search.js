import express from "express";
import SearchController from "../controller/search.js";

const searchRouter = express.Router();
const search = new SearchController();

searchRouter.get("/job-seeker/search-salary-for-role", search.searchSalaries);

export default searchRouter;
