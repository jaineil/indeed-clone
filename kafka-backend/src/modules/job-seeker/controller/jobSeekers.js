import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";

class JobSeekerController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

	saveJob = async (data) => {
		const jobSeekerId = data.jobSeekerId;
		const savedJob = {
			jobId: data.jobId,
			jobTitle: data.jobTitle,
			companyId: data.companyId,
			companyName: data.companyName,
		};

		try {
			const response = await JobSeekerDetails.updateOne(
				{ _id: jobSeekerId },
				{
					$push: {
						savedJobs: savedJob,
					},
				}
			);
			console.log(response);
			return this.responseGenerator(200, "Saved");
		} catch (err) {
			console.error("Error when saving job for job-seeker ", err);
			return this.responseGenerator(
				400,
				"Error when saving job for job-seeker"
			);
		}
	};
}

export default JobSeekerController;
