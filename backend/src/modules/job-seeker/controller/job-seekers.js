import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";
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
				res.status(200).send(jobSeekerDetails);
			}
		} catch (err) {
			console.error(err);
		}
	};

	updateprofile = async (req, res) => {
		const {
			jobseekerId,
			firstName,
			lastName,
			profilePicture = "",
			resumes = [],
			coverLetters = [],
			contactNumber,
			street,
			apt,
			city,
			state,
			country,
			zip,
			savedJobs = [],
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
			profilePicture,
			resumes,
			coverLetters,
			contactNumber,
			address,
			savedJobs,
		};
		const result = await JobSeekerDetails.findByIdAndUpdate(
			jobseekerId,
			update,
			{ new: true }
		);
		console.log(result);
		res.status(200).send(result);
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
