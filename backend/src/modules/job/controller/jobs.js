import { make_request } from "../../../../kafka/client.js";
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
				salary: parseInt(req.body.salary),
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
				employerId: req.params.employerId,
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
				companyId: req.params.companyId,
			});
			res.status(200).send({
				jobList: response,
			});
		} catch (err) {
			console.error(err);
		}
	};

	fetchJobDetails = async (req, res) => {
		console.log("Inside jobs controller, about to make Kafka request");

		const message = {};
		message.body = req.params;
		message.path = req.route.path;

		make_request("job", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Fetched job-details with kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	fetchJobsOfCompany = async (req, res) => {
		console.log("Inside jobs controller, about to make Kafka request");

		const message = {};
		message.body = req.query;
		message.path = req.path;

		make_request("job", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log(
					"Fetched jobs for a particular company with kafka-backend"
				);
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};
}

export default JobController;
