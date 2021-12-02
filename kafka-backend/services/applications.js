import JobSeekerApplicationController from "../src/modules/application/controller/applications.js";

const handleJobApplicationRequest = async (req, callback) => {
	console.log("HERE 1");
	console.log("----------------", req.path, "----------------");
	console.log(req);
	const jobSeekerApplicationController = new JobSeekerApplicationController();
	let results;
	switch (req.path) {
		case "/job-seeker/job-details/apply":
			results = await jobSeekerApplicationController.apply(req.body);
			break;
		case "/employer/change-applicant-status":
			results =
				await jobSeekerApplicationController.changeApplicantStatus(
					req.body
				);
			break;
	}

	callback(null, results);
};

export default handleJobApplicationRequest;
