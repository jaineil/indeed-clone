import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";
import JobSeekerApplications from "../../../db/models/mongo/jobSeekerApplications.js";
import Jobs from "../../../db/models/mongo/jobs.js";
import fs from "fs";
import multiparty from "multiparty";
import fileType from "file-type";
import uploadFile from "../../../db/config/s3_config.js";
import { make_request } from "../../../../kafka/client.js";

export class JobSeekerController {
	getprofile = async (req, res) => {
		try {
			const jobSeekerDetails = await JobSeekerDetails.findById(
				req.query.jobseekerId
			);
			if (!jobSeekerDetails) {
				res.status(404).send({
					message: "Could not find jobseeker profile",
				});
			} else {
				const appliedJobs = await JobSeekerApplications.find({
					jobSeekerId: req.query.jobseekerId,
				});
				let finalRes = { ...jobSeekerDetails._doc, appliedJobs: [] };
				for (let i = 0; i < appliedJobs.length; i++) {
					const job = await Jobs.findById(appliedJobs[i].jobId, {
						jobTitle: 1,
					});
					finalRes.appliedJobs.push({
						...appliedJobs[i]._doc,
						jobTitle: job.jobTitle,
					});
				}
				res.status(200).send(finalRes);
			}
		} catch (err) {
			console.error(err);
		}
	};

	updateprofile = async (req, res) => {
		try {
			const {
				jobseekerId,
				firstName,
				lastName,
				contactNumber,
				street,
				apt,
				city,
				state,
				country,
				zip,
			} = req.body;

			const address = {
				street: street,
				apt: apt,
				city: city,
				state: state,
				country: country,
				zip: zip,
			};

			console.log(req.body);
			const update = {
				firstName,
				lastName,
				contactNumber,
				address,
			};
			const result = await JobSeekerDetails.findByIdAndUpdate(
				jobseekerId,
				update,
				{ new: true }
			);
			console.log(result);
			res.status(200).send(result);
		} catch (err) {
			console.error(err);
		}
	};

	unsaveJob = async (req, res) => {
		try {
			const { jobSeekerId, jobId } = req.body;
			const jobseeker = await JobSeekerDetails.updateOne(
				{ _id: jobSeekerId },
				{ $pull: { savedJobs: { jobId: jobId } } },
				{ multi: true }
			);
			if (jobseeker.modifiedCount > 0) {
				console.log(jobseeker);
				res.status(200).send({ message: "Job Unsaved" });
			} else {
				res.status(400).send({ message: "Cannot unsave job" });
			}
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: err });
		}
	};

	uploadResume = async (req, res) => {
		try {
			const { jobSeekerId, resumeName } = req.query;
			const form = new multiparty.Form();
			//console.log(req);
			form.parse(req, async (error, fields, files) => {
				if (error) {
					return res.status(500).send(error);
				} else {
					console.log(files);
					const path = files.file[0].path;
					const buffer = fs.readFileSync(path);
					const type = await fileType.fromBuffer(buffer);
					const fileName = `resume/${jobSeekerId}/${resumeName}`;
					const s3res = await uploadFile(buffer, fileName, type);
					console.log("Success: ", s3res);
					if (s3res) {
						const resume = {
							url: s3res.Location,
							name: resumeName,
						};
						const jobseeker = await JobSeekerDetails.findById(
							jobSeekerId
						);
						console.log(jobseeker);
						jobseeker.resumes.push(resume);
						await jobseeker.save();
						res.status(200).send({ message: "Resume uploaded!" });
					} else {
						res.status(500).send({
							message: "Resume not uploaded!",
						});
					}
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	deleteResume = async (req, res) => {
		try {
			const { jobSeekerId, resumeId, resumeName } = req.body;
			const jobseeker = await JobSeekerDetails.updateOne(
				{ _id: jobSeekerId },
				{ $pull: { resumes: { _id: resumeId, name: resumeName } } },
				{ multi: true }
			);

			if (jobseeker.modifiedCount > 0) {
				console.log(jobseeker);
				res.status(200).send({ message: "Resume Deleted" });
			} else {
				res.status(400).send({ message: "Cannot delete resume" });
			}
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: err });
		}
	};

	saveJob = async (req, res) => {
		console.log(
			"Inside job-seeker controller, about to make Kafka request"
		);

		const message = {};
		message.body = req.body;
		message.path = req.path;

		make_request("job-seeker", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Saved job with kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};
}

export default JobSeekerController;
