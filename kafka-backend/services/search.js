import { SearchController } from "../src/modules/search/controller/search.js";

const handleSearchRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const searchController = new SearchController();
	let results;

	switch (req.path) {
		case "/job-seeker/search-suggestions":
			results = await searchController.searchJobsTitlesForAutocomplete(
				req.body
			);
			break;
		case "/job-seeker/search-jobs":
			results = await searchController.searchJobs(req.body);
			break;
		case "/job-seeker/search-for-companies":
			results = await searchController.searchCompanies(req.body);
			break;
		case "/job-seeker/search-salary-for-role":
			results = await searchController.searchSalaries(req.body);
			break;
	}

	callback(null, results);
};

export default handleSearchRequest;
