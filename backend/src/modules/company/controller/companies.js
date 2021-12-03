import CompanyDetails from "../../../db/models/mongo/companyDetails.js";
import EmployerDetails from "../../../db/models/mongo/employerDetails.js";
import CompanyClicks from "../../../db/models/mongo/companyClicks.js";
import { make_request } from "../../../../kafka/client.js";
class CompanyController {
	create = async (req, res) => {
		try {
			console.log(req.body)
			const description = {
				missionAndVision: req.body.missionAndVision,
				about: req.body.about,
				workCulture: req.body.workCulture,
				values: req.body.values}

			const companyLocation = {
					city: req.body.city,
					state: req.body.state,
					street: req.body.street,
					zipcode: req.body.zipcode,
					country: req.body.country,
			};

			const newCompany = new CompanyDetails({
				companyName: req.body.companyName,
				websiteUrl: req.body.websiteUrl,
				companySize: req.body.companySize,
				companyType: req.body.companyType,
				revenue: req.body.revenue,
				headquarters: req.body.headquarters,
				industry: req.body.industry,
				founded: req.body.founded,
				description : description,
				ceoName: req.body.ceoName,
				averageRating: req.body.averageRating? parseInt(req.body.averageRating):0,
				companyLocation: companyLocation
			});
			const response = await newCompany.save();
			await EmployerDetails.findByIdAndUpdate(req.body.employerId, {
				companyId: response._id.valueOf(),
			});

			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	postFeaturedReview = async (req, res) => {
		console.log(req.body);
		try {
			const response = await CompanyDetails.updateOne(
				{ _id: req.body.companyId },
				{ $push: { featuredReviews: { reviewId: req.body.reviewId } } }
			);
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	getCompany = async (req, res) => {
		try {
			const response = await CompanyDetails.findOne({
				_id: req.query.companyId,
			});
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	getAllCompanies = async (req, res) => {
		try {
			const response = await CompanyDetails.find();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	top5CompaniesByAverageRating = async (req, res) => {
		try {
			const companies = await CompanyDetails.find()
				.sort({ averageRating: -1 })
				.limit(5);
			let response = [];
			for (let i = 0; i < companies.length; i++) {
				response.push({
					companyName: companies[i].companyName,
					averageRating: companies[i].averageRating,
				});
			}
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	updateCompany = async (req, res) => {
		try {
			
			const {
				companyId,
				companyName,
				websiteUrl,
				companySize,
				companyType,
				revenue,
				headquarters,
				industry,
				founded,
				ceoName,
				averageRating,
				city,
				state,
				street,
				zipcode,
				country,
				missionAndVision,
				about, 
				workCulture,
				values,
				featuredReviews = [],
			} = req.body;
			const companyLocation = {
				city: city,
				state: state,
				street: street,
				zipcode: zipcode,
				country: country,
			};
			const description = {
				missionAndVision: missionAndVision,
				about: about,
				workCulture: workCulture,
				values: values};

			const update = {
				companyName,
				websiteUrl,
				companySize,
				companyType,
				revenue,
				headquarters,
				industry,
				founded,
				ceoName,
				averageRating,
				companyLocation,
				description
			};

			const response = await CompanyDetails.findOneAndUpdate(
				{
					_id: companyId,
				},
				update
			);

			res.status(200).send({ message: "Company Updated" });
		} catch (err) {
			console.error(err);
		}
	};

	fetchCompanySnapshot = async (req, res) => {
		console.log("Inside companies controller, about to make Kafka request");

		const message = {};
		message.body = req.params;
		message.path = req.route.path;

		make_request("company", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log(
					"Fetched company snapshot details with kafka-backend"
				);
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	fetchCompanyWhyJoinUs = async (req, res) => {
		console.log("Inside companies controller, about to make Kafka request");

		const message = {};
		message.body = req.params;
		message.path = req.route.path;

		make_request("company", message, (err, results) => {
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

	fetchPhotos = async (req, res) => {
		console.log("Inside companies controller, about to make Kafka request");

		const message = {};
		message.body = req.params;
		message.path = req.route.path;

		make_request("company", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Fetched company photos details kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	fetchCompanySalaries = async (req, res) => {
		console.log("Inside companies controller, about to make Kafka request");

		const message = {};
		message.body = req.params;
		message.path = req.route.path;
		console.log(JSON.stringify(message));
		make_request("company", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Fetched company salaries with kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	addClick = async (req, res) => {
		console.log("Inside companies controller, about to make Kafka request");

		const message = {};
		message.body = req.body;
		message.path = req.path;

		make_request("company", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Added company click with kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	top10CompaniesDailyClicks = async (req, res) => {
		try {
			const response = await CompanyClicks.aggregate([
				{
					$match: {
						date: req.params.date,
					},
				},
				{
					$sort: {
						clicks: -1,
					},
				},
				{
					$limit: 10,
				},
			]);
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	addClick = async (req, res) => {
		console.log("Inside companies controller, about to make Kafka request");

		const message = {};
		message.body = req.body;
		message.path = req.path;

		make_request("company", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Added company click with kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};
}

export default CompanyController;
