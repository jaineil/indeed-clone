import Reviews from "../../../db/models/mongo/reviews.js";

class ReviewController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

	fetchJobSeekerReviews = async (data) => {
		console.log(data);

		const companyId = data.companyId;
		const jobSeekerId = data.jobSeekerId;
		let results = [];

		try {
			const jobSeekerReviews = await Reviews.find({
				jobSeekerId: jobSeekerId,
				companyId: companyId,
			});

			jobSeekerReviews.map((review) =>
				results.push({
					reviewTitle: review.reviewTitle,
					reviewerRole: review.reviewerRole,
					city: review.companyLocation.city,
					state: review.companyLocation.state,
					postedOn: review.postedOn,
					rating: review.overallCompanyRatingByReviewer,
					reviewHelpfulCount: review.reviewHelpfulCount,
					reviewNotHelpfulCount: review.reviewNotHelpfulCount,
				})
			);

			console.log(JSON.stringify(results));
			return this.responseGenerator(200, results);
		} catch (err) {
			console.error(
				"Error when fetching reviews for a particular job seeker ",
				err
			);
			return this.responseGenerator(
				404,
				"Error when fetching reviews for a particular job seeker"
			);
		}
	};

	fetchReviews = async (data) => {
		console.log(data);
		const companyId = data.companyId;
		const sortBy = data.sortBy;
		let results = [];

		if (sortBy === "HELPFULNESS") {
			try {
				const reviews = await Reviews.find({
					companyId: companyId,
				})
					.sort({ reviewHelpfulCount: -1 })
					.populate("companyId")
					.exec();

				reviews.map((review) =>
					results.push({
						reviewId: review._id,
						reviewTitle: review.reviewTitle,
						reviewBody: review.reviewBody,
						reviewerRole: review.reviewerRole,
						pros: review.pros,
						cons: review.cons,
						interviewPrepTips: review.interviewTips,
						city: review.companyLocation.city,
						state: review.companyLocation.state,
						postedOn: review.postedOn,
						rating: review.overallCompanyRatingByReviewer,
						reviewHelpfulCount: review.reviewHelpfulCount,
						reviewNotHelpfulCount: review.reviewNotHelpfulCount,
					})
				);

				console.log(JSON.stringify(results));
				return this.responseGenerator(200, results);
			} catch (err) {
				console.error("Error when fetching reviews for company ", err);
				return this.responseGenerator(
					404,
					"Error when fetching reviews for company"
				);
			}
		} else if (sortBy === "RATING") {
			try {
				const reviews = await Reviews.find({
					companyId: companyId,
				})
					.sort({ overallCompanyRatingByReviewer: -1 })
					.populate("companyId")
					.exec();

				reviews.map((review) =>
					results.push({
						reviewId: review._id,
						reviewTitle: review.reviewTitle,
						reviewBody: review.reviewBody,
						reviewerRole: review.reviewerRole,
						pros: review.pros,
						cons: review.cons,
						interviewPrepTips: review.interviewTips,
						city: review.companyLocation.city,
						state: review.companyLocation.state,
						postedOn: review.postedOn,
						rating: review.overallCompanyRatingByReviewer,
						reviewHelpfulCount: review.reviewHelpfulCount,
						reviewNotHelpfulCount: review.reviewNotHelpfulCount,
					})
				);

				console.log(JSON.stringify(results));
				return this.responseGenerator(200, results);
			} catch (err) {
				console.error("Error when fetching reviews for company ", err);
				return this.responseGenerator(
					404,
					"Error when fetching reviews for company"
				);
			}
		} else {
			try {
				const reviews = await Reviews.find({
					companyId: companyId,
				})
					.sort({ postedOn: -1 })
					.populate("companyId")
					.exec();

				reviews.map((review) =>
					results.push({
						reviewId: review._id,
						reviewTitle: review.reviewTitle,
						reviewBody: review.reviewBody,
						reviewerRole: review.reviewerRole,
						pros: review.pros,
						cons: review.cons,
						interviewPrepTips: review.interviewTips,
						city: review.companyLocation.city,
						state: review.companyLocation.state,
						postedOn: review.postedOn,
						rating: review.overallCompanyRatingByReviewer,
						reviewHelpfulCount: review.reviewHelpfulCount,
						reviewNotHelpfulCount: review.reviewNotHelpfulCount,
					})
				);

				console.log(JSON.stringify(results));
				return this.responseGenerator(200, results);
			} catch (err) {
				console.error("Error when fetching reviews for company ", err);
				return this.responseGenerator(
					404,
					"Error when fetching reviews for company"
				);
			}
		}
	};
}

export default ReviewController;
