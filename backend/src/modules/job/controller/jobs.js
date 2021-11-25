import Jobs from "../../../db/models/mongo/jobs.js";

class JobController {
	create = async (req, res) => {
		try {
			const newJob = new Jobs({
				companyId: req.body.companyId,
				companyName: req.body.companyName,
				jobTitle: req.body.jobTitle,
				industry: req.body.industry,
				jobLocation: req.body.jobLocation,
				jobDescription: req.body.jobDescription,
				jobType: req.body.jobType,
				remote: req.body.remote,
				salary: req.body.salary,
			});
			const response = await newJob.save();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};
}

export default JobController;
