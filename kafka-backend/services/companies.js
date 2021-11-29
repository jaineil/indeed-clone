import CompanyController from "../src/modules/company/controller/companies.js";

const handleCompanyRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const companyController = new CompanyController();
	let results;
	switch (req.path) {
		case "/job-seeker/company-home/:companyId":
			results = await companyController.fetchCompanySnapshot(req.body);
			break;
		case "/job-seeker/company-details/join-us/:companyId":
			results = await companyController.fetchCompanyWhyJoinUs(req.body);
			break;
	}

	callback(null, results);
};

export default handleCompanyRequest;
