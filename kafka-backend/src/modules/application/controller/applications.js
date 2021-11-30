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
						coverLetters: {
							url: data.coverLetterUrl,
							name: data.coverLetterName,
						},
					},
				}
			);
			console.log("Added resume and cover letter to job seeker details");
		} catch (err) {
			console.error("Error when updating job seeker resumes ", err);
		}

		let resumeId;
		let coverLetterId;

		try {
			const lastUsedResume = await JobSeekerDetails.findOne(
				{ _id: data.jobSeekerId },
				{ resumes: { $slice: -1 } }
			);
			const lastUsedCoverLetter = await JobSeekerDetails.findOne(
				{ _id: data.jobSeekerId },
				{ coverLetters: { $slice: -1 } }
			);

			resumeId = lastUsedResume.resumes[0].id;
			coverLetterId = lastUsedCoverLetter.coverLetters[0].id;

			console.log(
				"Fetched resumeId and coverLetterId ",
				resumeId,
				coverLetterId
			);
		} catch (err) {
			console.error(
				"Error when fetching latest resume/cover letter details ",
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
			coverLetter: {
				coverLetterId: coverLetterId,
				url: data.coverLetterUrl,
				name: data.coverLetterName,
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
}

export default JobSeekerApplicationController;
