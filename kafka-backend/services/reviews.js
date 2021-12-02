import ReviewController from "../src/modules/review/controller/reviews.js";

const handleReviewRequest = async (req, callback) => {
	console.log("----------------", req.path, "----------------");

	const reviewController = new ReviewController();
	let results;
	switch (req.path) {
		case "/job-seeker/company-details/reviews":
			results = await reviewController.fetchReviews(req.body);
			break;
		case "/job-seeker/company-details/job-seeker-reviews":
			results = await reviewController.fetchJobSeekerReviews(req.body);
			break;
	}

	callback(null, results);
};

export default handleReviewRequest;
