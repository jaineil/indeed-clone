import JobController from "../src/modules/job/controller/jobs.js";

const handleJobRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const jobsController = new JobController();
	let results;
	switch (req.path) {
		case "/job-seeker/job-details/:jobId":
			results = await jobsController.fetchJobDetails(req.body);
			break;
		case "/job-seeker/get-jobs-for-company":
			results = await jobsController.fetchJobsOfCompany(req.body);
	}

	callback(null, results);
};

export default handleJobRequest;
