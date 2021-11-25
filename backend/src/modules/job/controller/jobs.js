import Jobs from "../../../db/models/mongo/jobs.js";

class JobController {
	create = async (req, res) => {
		try {
			const newJob = new Jobs({
				companyId: req.body.companyId,
				companyName: req.body.companyName,
				employerId: req.body.employerId,
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

	getJobList = async (req, res) => {
		try {
			const response = await Jobs.find({
				employerId: req.body.employerId,
			});
			res.status(200).send({
				jobList: response,
			});
		} catch (err) {
			console.error(err);
		}
	};

	showJobsByCompany = async (req, res) => {
		try {
			const response = await Jobs.find({
				companyId: req.body.companyId,
			});
			res.status(200).send({
				jobList: response,
			});
		} catch (err) {
			console.error(err);
		}
	};
}

export default JobController;
