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
					reviewTitle: req.body.reviewSummary,
					reviewBody: req.body.yourReview,
					pros: req.body.pros,
					cons: req.body.cons,
					ceoApprovalRating: req.body.ceoApproval,
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
}

export default ReviewController;
