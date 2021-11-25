import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails";
export class JobSeekerController {
	getprofile = async (req, res) => {
		try {
			const jobSeekerDetails = await JobSeekerDetails.findById(
				req.query.jobSeekerId
			);
			if (!jobSeekerDetails) {
				res.status(404).send({
					message: "Could not find jobseeker profile",
				});
			} else {
				res.status(200).send(jobSeekerDetails);
			}
		} catch (err) {
			console.error(err);
		}
	};

	
}

export default JobSeekerController;
