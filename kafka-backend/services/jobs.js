import JobController from "../src/modules/job/controller/jobs.js";

const handleJobRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const jobsController = new JobController();
	let results;
	console.log("About to shoot 1 => ", req);
	switch (req.path) {
		case "/job-seeker/job-details/:jobId":
			console.log("About to shoot 2 => ", req);
			results = await jobsController.fetchJobDetails(req.body);
			break;
	}

	callback(null, results);
};

export default handleJobRequest;
