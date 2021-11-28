import Jobs from "../../../db/models/mongo/jobs.js";
import CompanyDetails from "../../../db/models/mongo/companyDetails.js";
import Reviews from "../../../db/models/mongo/reviews.js";

class JobController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

	fetchJobDetails = async (data) => {
		console.log(data);
		const jobId = data.jobId;
		try {
			const jobDetails = await Jobs.findOne({ _id: jobId });
			console.log(JSON.stringify(jobDetails));

			const companyId = jobDetails.companyId;
			const company = await CompanyDetails.findOne({
				_id: companyId,
			});
			const averageRating = company.averageRating;

			// think of extracting approved reviewsCount as a field in companyDetails collection
			const totalReviewsForCompany = await Reviews.find({
				companyId: companyId,
				isReviewApprovedByAdmin: "APPROVED",
			});
			console.log(totalReviewsForCompany.length);

			const result = {
				companyName: jobDetails.companyName,
				jobTitle: jobDetails.jobTitle,
				averageRating: averageRating,
				numberOfReviews: totalReviewsForCompany.length,
				location: `${jobDetails.jobLocation.city}, ${jobDetails.jobLocation.state}, ${jobDetails.jobLocation.zip}`,
				jobType: jobDetails.jobType,
				salaryDetails: jobDetails.salary,
				yourRole: jobDetails.responsibilites,
				whyYouWillLoveWorking: jobDetails.whyUs,
				skillsNeeded: jobDetails.requirements,
			};

			return this.responseGenerator(200, result);
		} catch (err) {
			console.error("Error when fetching job details ", err);
			return this.responseGenerator(
				404,
				"Error when fetching job details"
			);
		}
	};
}

export default JobController;
