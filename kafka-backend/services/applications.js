import JobSeekerApplicationController from "../src/modules/application/controller/applications.js";

const handleJobApplicationRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const jobSeekerApplicationController = new JobSeekerApplicationController();
	let results;
	switch (req.path) {
		case "/job-seeker/job-details/apply":
			results = await jobSeekerApplicationController.apply(req.body);
			break;
	}

	callback(null, results);
};

export default handleJobApplicationRequest;
