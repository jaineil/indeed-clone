import { make_request } from "../../../../kafka/client.js";
import JobSeekerApplications from "../../../db/models/mongo/jobSeekerApplications.js";
import mongoose from "mongoose";

export class JobApplicationController {
	apply = async (req, res) => {
		console.log(
			"Inside job-application controller, about to make Kafka request"
		);

		const message = {};
		message.body = req.body;
		message.path = req.path;

		make_request("job-application", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Applied to a job with kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	getApplicantResumeCoverLetter = async (req, res) => {
		try {
			const response = await JobSeekerApplications.findById(
				req.params.applicationId
			);
			res.send(response);
		} catch (err) {
			console.error(err);
			res.send({ error: err });
		}
	};

	getListOfApplicantsForJob = async (req, res) => {
		try {
			let filters = {
				jobId: new mongoose.mongo.ObjectId(req.query.jobId),
			};
			if (
				["HIRED", "REJECTED"].includes(req.query.status)
			) {
				filters["applicationStatus"] = req.query.status;
			}
			const response = await JobSeekerApplications.aggregate([
				{
					$lookup: {
						from: "jobseekerdetails",
						localField: "jobSeekerId",
						foreignField: "_id",
						as: "jobSeekerDetails",
					},
				},
				{
					$unwind: "$jobSeekerDetails",
				},
				{
					$match: filters,
				},
			]);
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
			res.send({ error: err });
		}
	};

	getNumberOfApplicantsForJob = async (req, res) => {
		try {
			const numberOfApplicants = await JobSeekerApplications.aggregate([
				{
					$match: {
						jobId: new mongoose.mongo.ObjectId(req.query.jobId),
					},
				},
				{
					$count: "numberOfApplicants",
				},
			]);
			const numberHired = await JobSeekerApplications.aggregate([
				{
					$match: {
						jobId: new mongoose.mongo.ObjectId(req.query.jobId),
						applicationStatus: "HIRED",
					},
				},
				{
					$count: "numberHired",
				},
			]);
			const numberRejected = await JobSeekerApplications.aggregate([
				{
					$match: {
						jobId: new mongoose.mongo.ObjectId(req.query.jobId),
						applicationStatus: "REJECTED",
					},
				},
				{
					$count: "numberRejected",
				},
			]);
			console.log(numberOfApplicants);
			console.log(numberHired);
			console.log(numberRejected);
			const response = {
				numberOfApplicants: numberOfApplicants.length
					? numberOfApplicants[0].numberOfApplicants
					: 0,
				numberHired: numberHired.length
					? numberHired[0].numberHired
					: 0,
				numberRejected: numberRejected.length
					? numberRejected[0].numberRejected
					: 0,
			};
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
			res.send({ error: err });
		}
	};
}

export default JobApplicationController;
