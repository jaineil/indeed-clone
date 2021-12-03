import JobSeekerApplications from "../../../db/models/mongo/jobSeekerApplications.js";
import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";

class JobSeekerApplicationController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

	apply = async (data) => {
		console.log(data);

		try {
			await JobSeekerDetails.updateOne(
				{ jobSeekerId: data.jobSeekerId },
				{
					$push: {
						resumes: {
							url: data.resumeUrl,
							name: data.resumeName,
						},
					},
				}
			);
			console.log("Added resume to job seeker details");
		} catch (err) {
			console.error("Error when updating job seeker resumeUrl ", err);
		}

		let resumeId;

		try {
			const lastUsedResume = await JobSeekerDetails.findOne(
				{ _id: data.jobSeekerId },
				{ resumes: { $slice: -1 } }
			);

			resumeId = lastUsedResume.resumes[0].id;

			console.log("Fetched resumeId ", resumeId);
		} catch (err) {
			console.error(
				"Error when fetching latest resume letter details ",
				err
			);
		}

		const newJobApplication = new JobSeekerApplications({
			jobId: data.jobId,
			jobSeekerId: data.jobSeekerId,
			companyId: data.companyId,
			companyName: data.companyName,
			applicationStatus: "APPLIED",
			resume: {
				resumeId: resumeId,
				url: data.resumeUrl,
				name: data.resumeName,
			},
		});

		try {
			await newJobApplication.save();
			return this.responseGenerator(200, "Applied");
		} catch (err) {
			console.error("Error when applying to job ", err);
			return this.responseGenerator(400, "Error when applying to job");
		}
	};

	changeApplicantStatus = async (data) => {
		console.log(data);
		const jobApplicationId = data.jobApplicationId;
		const updatedStatus = data.status;

		try {
			await JobSeekerApplications.findByIdAndUpdate(jobApplicationId, {
				applicationStatus: updatedStatus,
			});
			return this.responseGenerator(200, "Updated");
		} catch (err) {
			console.error(
				"Error when updating job-seeker application status ",
				err
			);
			return this.responseGenerator(
				404,
				"Error when updating job-seeker application status"
			);
		}
	};
}

export default JobSeekerApplicationController;
