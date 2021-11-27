import Review from "../../../db/models/mongo/reviews.js";
import CompanyDetails from "../../../db/models/mongo/companyDetails.js";

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
					overallCompanyRatingByReviewer: req.body.overallRating,
					reviewTitle: req.body.reviewTitle,
					reviewBody: req.body.reviewBody,
					pros: req.body.pros,
					cons: req.body.cons,
					ceoApprovalRating: req.body.ceoApprovalRating,
					interviewTips: req.body.interviewPrepTips,
					companyLocation: companyDetails.companyLocation,
					categoricalRating: req.body.categoricalRating,
				});
				const response = await newReview.save();
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
					companyId: req.body.companyId,
					_id: req.body.reviewId,
				},
				{
					$inc: {
						reviewHelpfulCount: req.body.helpful ? 1 : 0,
						reviewNotHelpfulCount: req.body.helpful ? 0 : 1,
					},
				}
			);
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
				req.body.companyId
			);
			const featuredReviews = companyDetails.featuredReviews.map((x) =>
				x.reviewId.toString()
			);
			const companyReviews = await Review.find({
				companyId: req.body.companyId,
			});
			let response = [];
			for (let i = 0; i < companyReviews.length; i++) {
				response.push({
					jobSeekerId: companyReviews[i].jobSeekerId,
					reviewId: companyReviews[i].id,
					overallCompanyRatingByReviewer:
						companyReviews[i].overallCompanyRatingByReviewer,
					reviewTitle: companyReviews[i].reviewTitle,
					reviewBody: companyReviews[i].reviewBody,
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
				companyName: req.body.companyName,
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
			let reviews = []
			if (req.query.filter){
				reviews = await Review.find({
					isReviewApprovedByAdmin : req.query.filter
				});
			}
			else {
				reviews = await Review.find({});
			}
			res.status(200).send(reviews);

		} catch (err) {
			console.error(err);
		}
	};

	updateRequest = async (req, res) => {

		try {
				const {reviewId, companyId, status} = req.body

				const response = await Review.findOneAndUpdate(
					{
						companyId: companyId,
						_id: reviewId,
					},
					{
						isReviewApprovedByAdmin: status
					}
				);

				res.status(200).send({message : "Review Status Updated"});

		} catch (err) {
			console.error(err);
		}
	};
	

}

export default ReviewController;
