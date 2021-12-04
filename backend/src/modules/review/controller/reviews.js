import Review from "../../../db/models/mongo/reviews.js";
import CompanyDetails from "../../../db/models/mongo/companyDetails.js";
import { make_request } from "../../../../kafka/client.js";
import client from "../../../db/config/redis.config.js";
import { response } from "express";

// client.del("review/619f3868ef6dff3633f6d959/DATE");
// client.del("review/619f3868ef6dff3633f6d959/HELPFULNESS");
// client.del("review/619f3868ef6dff3633f6d959/RATING");

class ReviewController {
	create = async (req, res) => {
		try {
			const companyDetails = await CompanyDetails.findById(
				req.body.companyId
			);
			if (!companyDetails) {
				res.status(404).send({
					message: "Could not find company",
				});
			} else {
				const newReview = new Review({
					jobSeekerId: req.body.jobSeekerId,
					companyId: req.body.companyId,
					companyName: companyDetails.companyName,
					overallCompanyRatingByReviewer: parseInt(req.body.rating),
					reviewerRole: req.body.reviewerRole,
					reviewTitle: req.body.reviewTitle,
					reviewBody: req.body.reviewBody,
					pros: req.body.pros.split(","),
					cons: req.body.cons.split(","),
					ceoApprovalRating: parseInt(req.body.ceoApproval),
					interviewTips: req.body.interviewPrepTips.split(","),
					companyLocation: companyDetails.companyLocation,
					categoricalRating: req.body.categoricalRating,
				});
				const response = await newReview.save();
				client.del(`review/${req.body.companyId}/DATE`);
				client.del(`review/${req.body.companyId}/HELPFULNESS`);
				client.del(`review/${req.body.companyId}/RATING`);
				res.status(200).send(response);
			}
		} catch (err) {
			console.error(err);
		}
	};

	setHelpfulness = async (req, res) => {
		try {
			const response = await Review.findOneAndUpdate(
				{
					_id: req.body.reviewId,
				},
				{
					$inc: {
						reviewHelpfulCount: req.body.helpful ? 1 : 0,
						reviewNotHelpfulCount: req.body.helpful ? 0 : 1,
					},
				}
			);
			client.del(`review/${req.body.companyId}/DATE`);
			client.del(`review/${req.body.companyId}/HELPFULNESS`);
			client.del(`review/${req.body.companyId}/RATING`);
			res.status(200).send({
				reviewHelpfulCount:
					response.reviewHelpfulCount + (req.body.helpful ? 1 : 0),
				reviewNotHelpfulCount:
					response.reviewNotHelpfulCount + (req.body.helpful ? 0 : 1),
			});
		} catch (err) {
			console.error(err);
		}
	};

	viewReviewsAndRatings = async (req, res) => {
		try {
			const companyDetails = await CompanyDetails.findById(
				req.params.companyId
			);
			const featuredReviews = companyDetails.featuredReviews.map((x) =>
				x.reviewId.toString()
			);
			const companyReviews = await Review.find({
				companyId: req.params.companyId,
				isReviewApprovedByAdmin: "APPROVED",
			});
			let response = [];
			for (let i = 0; i < companyReviews.length; i++) {
				response.push({
					jobSeekerId: companyReviews[i].jobSeekerId,
					reviewId: companyReviews[i].id,
					companyId: companyReviews[i].companyId,
					companyName: companyReviews[i].companyName,
					overallCompanyRatingByReviewer:
						companyReviews[i].overallCompanyRatingByReviewer,
					reviewerRole: companyReviews[i].reviewerRole,
					reviewTitle: companyReviews[i].reviewTitle,
					reviewBody: companyReviews[i].reviewBody,
					pros: companyReviews[i].pros,
					cons: companyReviews[i].cons,
					ceoApprovalRating: companyReviews[i].ceoApprovalRating,
					interviewTips: companyReviews[i].interviewTips,
					companyLocation: companyReviews[i].companyLocation,
					reviewHelpfulCount: companyReviews[i].reviewHelpfulCount,
					reviewNotHelpfulCount:
						companyReviews[i].reviewNotHelpfulCount,
					categoricalRating: companyReviews[i].categoricalRating,
					isReviewApprovedByAdmin:
						companyReviews[i].isReviewApprovedByAdmin,
					featuredReview: featuredReviews.includes(
						companyReviews[i].id
					),
				});
			}
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	searchCompanyAdmin = async (req, res) => {
		try {
			const response = await Review.find({
				companyName: req.params.companyName,
			});
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	top5MostReviewedCompanies = async (req, res) => {
		try {
			const companies = await Review.aggregate([
				{ $sortByCount: "$companyName" },
			]).limit(5);
			let response = [];
			for (let i = 0; i < companies.length; i++) {
				response.push({
					companyName: companies[i]._id,
					reviewCount: companies[i].count,
				});
			}
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	topCEOs = async (req, res) => {
		try {
			const companies = await Review.aggregate([
				{
					$group: {
						_id: "$companyId",
						ceoApprovalRating: {
							$avg: "$ceoApprovalRating",
						},
					},
				},
				{
					$sort: {
						ceoApprovalRating: -1,
					},
				},
				{
					$lookup: {
						from: "companydetails",
						localField: "_id",
						foreignField: "_id",
						as: "companyDetails",
					},
				},
			]).limit(10);
			res.status(200).send(
				companies.map((x) => {
					return {
						companyId: x._id,
						ceoApprovalRating: x.ceoApprovalRating,
						ceoName: x.companyDetails[0].ceoName,
					};
				})
			);
		} catch (err) {
			console.error(err);
		}
	};

	getRequests = async (req, res) => {
		try {
			let reviews = [];
			if (req.query.filter) {
				reviews = await Review.find({
					isReviewApprovedByAdmin: req.query.filter,
				});
			} else {
				reviews = await Review.find({});
			}
			res.status(200).send(reviews);
		} catch (err) {
			console.error(err);
		}
	};

	updateRequest = async (req, res) => {
		try {
			const { reviewId, companyId, status } = req.body;
			if (status === "APPROVED") {
				await CompanyDetails.findOneAndUpdate(
					{
						_id: companyId,
					},
					{ $inc: { reviewCount: 1 } }
				);
			}
			const response = await Review.findOneAndUpdate(
				{
					companyId: companyId,
					_id: reviewId,
				},
				{
					isReviewApprovedByAdmin: status,
				}
			);

			res.status(200).send({ message: "Review Status Updated" });
		} catch (err) {
			console.error(err);
		}
	};

	fetchReviews = async (req, res) => {
		client.get(
			`review/${req.query.companyId}/${req.query.sortBy}`,
			async (err, cache_res) => {
				if (err) {
					console.error(err);
					res.status(500).send(
						"Error when connecting to Redis cache"
					);
				} else {
					if (cache_res != null) {
						console.log("Found from cache");
						res.json(JSON.parse(cache_res));
						res.end();
					} else {
						console.log(
							"Inside reviews controller, about to make Kafka request"
						);

						const message = {};
						message.body = req.query;
						message.path = req.path;

						make_request("review", message, (err, results) => {
							if (err) {
								console.error(err);
								res.json({
									status: "Error",
									msg: "System error, try again",
								});
							} else {
								console.log(
									"Fetched reviews with kafka-backend"
								);
								console.log(results);
								// client.set(
								// 	`review/${req.query.companyId}/${req.query.sortBy}`,
								// 	JSON.stringify(results)
								// );
								res.json(results);
								res.end();
							}
						});
					}
				}
			}
		);
	};

	fetchJobSeekerReviews = async (req, res) => {
		console.log("Inside reviews controller, about to make Kafka request");

		const message = {};
		message.body = req.query;
		message.path = req.path;

		make_request("review", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log(
					"Fetched particular job-seeker's reviews with kafka-backend"
				);
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	fetchTopJobSeekersByAcceptedReviews = async (req, res) => {
		try {
			const response = await Review.aggregate([
				{
					$match: {
						isReviewApprovedByAdmin: "APPROVED",
					},
				},
				{
					$group: {
						_id: "$jobSeekerId",
						acceptedReviews: {
							$sum: 1,
						},
					},
				},
				{
					$sort: {
						acceptedReviews: -1,
					},
				},
				{
					$limit: 5,
				},
				{
					$lookup: {
						from: "jobseekerdetails",
						localField: "_id",
						foreignField: "_id",
						as: "jobSeekerInfo",
					},
				},
			]);
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	fetchReviewsPerDay = async (req, res) => {
		try {
			// console.log(new Date(2021, 11, 1));
			const response1 = await Review.find({
				postedOn: {
					$gte: new Date(2021, 10, 27),
					$lt: new Date(2021, 10, 28),
				},
			});
			const response2 = await Review.find({
				postedOn: {
					$gte: new Date(2021, 10, 28),
					$lt: new Date(2021, 10, 29),
				},
			});
			const response3 = await Review.find({
				postedOn: {
					$gte: new Date(2021, 10, 29),
					$lt: new Date(2021, 10, 30),
				},
			});
			const response4 = await Review.find({
				postedOn: {
					$gte: new Date(2021, 10, 30),
					$lt: new Date(2021, 11, 1),
				},
			});
			const response5 = await Review.find({
				postedOn: {
					$gte: new Date(2021, 11, 1),
					$lt: new Date(2021, 11, 2),
				},
			});
			const response6 = await Review.find({
				postedOn: {
					$gte: new Date(2021, 11, 2),
					$lt: new Date(2021, 11, 3),
				},
			});
			const response7 = await Review.find({
				postedOn: {
					$gte: new Date(2021, 11, 3),
					$lt: new Date(2021, 11, 4),
				},
			});
			const response = {
				days: [
					"2021-11-27",
					"2021-11-28",
					"2021-11-29",
					"2021-11-30",
					"2021-12-01",
					"2021-12-02",
					"2021-12-03",
				],
				reviewCount: [
					response1.length,
					response2.length,
					response3.length,
					response4.length,
					response5.length,
					response6.length,
					response7.length,
				],
			};
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	getAcceptedRejectedReviewsForCompany = async (req, res) => {
		try {
			const { companyId } = req.params;
			const response = await Review.find({
				companyId: companyId,
				isReviewApprovedByAdmin: {
					$in: ["APPROVED", "REJECTED"],
				},
			}).sort({
				postedOn: -1,
			});
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};
}

export default ReviewController;
