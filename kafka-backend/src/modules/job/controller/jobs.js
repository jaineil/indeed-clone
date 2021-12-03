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
				companyId: companyId,
				companyName: jobDetails.companyName,
				jobTitle: jobDetails.jobTitle,
				averageRating: averageRating,
				numberOfReviews: totalReviewsForCompany.length,
				location: `${jobDetails.jobLocation.city}, ${jobDetails.jobLocation.state}, ${jobDetails.jobLocation.zip}`,
				jobType: jobDetails.jobType,
				salaryDetails: jobDetails.salary,
				yourRole: jobDetails.jobDescription.description,
				whyYouWillLoveWorking: jobDetails.jobDescription.whyUs,
				skillsNeeded: jobDetails.jobDescription.requirements,
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

	fetchJobsOfCompany = async (data) => {
		console.log(data);
		const companyId = data.companyId;
		const jobTitle = data.jobTitle;
		const location = data.location;

		let results = [];

		const computeDaysElapsed = (jobPostedDateString) => {
			const jobPostedDate = new Date(jobPostedDateString);
			const today = new Date();
			const difference = today.getTime() - jobPostedDate.getTime();
			const days = Math.ceil(difference / (1000 * 3600 * 24));
			console.log(days + " since job was posted");
			return days;
		};

		try {
			if (jobTitle && location) {
				console.log("Both");
				const jobs = await Jobs.find({
					$and: [
						{
							companyId: companyId,
						},
						{
							jobTitle: {
								$regex: jobTitle,
								$options: "i",
							},
						},
						{
							$or: [
								{
									"jobLocation.city": {
										$regex: location,
										$options: "i",
									},
								},
								{
									"jobLocation.state": {
										$regex: location,
										$options: "i",
									},
								},
							],
						},
					],
				});

				jobs.map((job) =>
					results.push({
						jobId: job._id,
						jobTitle: job.jobTitle,
						location: job.jobLocation,
						daysPosted: computeDaysElapsed(job.postedOn),
						qualificationsRequired: job.jobDescription.requirements,
						responsibilites: job.jobDescription.responsibilites,
					})
				);
				console.log(JSON.stringify(results));
				return this.responseGenerator(200, results);
			}

			if (jobTitle && !location) {
				console.log("Only job location");
				const jobs = await Jobs.find({
					$and: [
						{
							companyId: companyId,
						},
						{
							jobTitle: {
								$regex: jobTitle,
								$options: "i",
							},
						},
					],
				});

				jobs.map((job) =>
					results.push({
						jobId: job._id,
						jobTitle: job.jobTitle,
						location: job.jobLocation,
						daysPosted: computeDaysElapsed(job.postedOn),
						qualificationsRequired: job.jobDescription.requirements,
						responsibilites: job.jobDescription.responsibilites,
					})
				);
				console.log(JSON.stringify(results));
				return this.responseGenerator(200, results);
			}

			if (!jobTitle && location) {
				console.log("Only location");
				const jobs = await Jobs.find({
					$and: [
						{
							companyId: companyId,
						},
						{
							$or: [
								{
									"jobLocation.city": {
										$regex: location,
										$options: "i",
									},
								},
								{
									"jobLocation.state": {
										$regex: location,
										$options: "i",
									},
								},
							],
						},
					],
				});

				jobs.map((job) =>
					results.push({
						jobId: job._id,
						jobTitle: job.jobTitle,
						location: job.jobLocation,
						daysPosted: computeDaysElapsed(job.postedOn),
						qualificationsRequired: job.jobDescription.requirements,
						responsibilites: job.jobDescription.responsibilites,
					})
				);
				console.log(JSON.stringify(results));
				return this.responseGenerator(200, results);
			}

			if (!jobTitle && !location) {
				const jobs = await Jobs.find({ companyId: companyId });
				jobs.map((job) =>
					results.push({
						jobId: job._id,
						jobTitle: job.jobTitle,
						location: job.jobLocation,
						daysPosted: computeDaysElapsed(job.postedOn),
						qualificationsRequired: job.jobDescription.requirements,
						responsibilites: job.jobDescription.responsibilites,
					})
				);
				console.log(JSON.stringify(results));
				return this.responseGenerator(200, results);
			}
		} catch (err) {
			console.error("Error when fetching jobs for a company ", err);
			return this.responseGenerator(
				200,
				"Error when fetching jobs for a company"
			);
		}
	};
}

export default JobController;
