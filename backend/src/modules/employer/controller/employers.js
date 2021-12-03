import EmployerDetails from "../../../db/models/mongo/employerDetails.js";
import { make_request } from "../../../../kafka/client.js";
export class EmployerController {
	getprofile = async (req, res) => {
		try {
			const employerDetails = await EmployerDetails.findOne({
				_id: req.query.employerId,
			}).populate("companyId");

			if (!employerDetails) {
				res.status(404).send({
					message: "Could not find employer profile",
				});
			} else {
				res.status(200).send(employerDetails);
			}
		} catch (err) {
			console.error(err);
		}
	};

	updateprofile = async (req, res) => {
		const {
			employerId,
			firstName,
			lastName,
			role,
			contactNumber,
			street,
			apt,
			city,
			state,
			country,
			zipcode,
		} = req.body;

		const companyLocation = {
			street: street,
			apt: apt,
			city: city,
			state: state,
			country: country,
			zipcode: zipcode,
		};

		const update = {
			firstName,
			lastName,
			role,
			contactNumber,
			companyLocation,
		};
		const result = await EmployerDetails.findByIdAndUpdate(
			employerId,
			update,
			{ new: true }
		);
		res.status(200).send(result);
	};

	changeApplicantStatus = async (req, res) => {
		console.log("Inside employers controller, about to make Kafka request");

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
				console.log(
					"Fetched company why-join-us details with kafka-backend"
				);
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};
}

export default EmployerController;
