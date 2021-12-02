import JobSeekerController from "../src/modules/job-seeker/controller/jobSeekers.js";

const handleJobSeekerRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const jobSeekerController = new JobSeekerController();
	let results;
	switch (req.path) {
		case "/job-seeker/save-job":
			results = await jobSeekerController.saveJob(req.body);
			break;
	}

	callback(null, results);
};

export default handleJobSeekerRequest;
