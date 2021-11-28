import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";
export class JobSeekerController {
	getprofile = async (req, res) => {
		try {
			const jobSeekerDetails = await JobSeekerDetails.findById(
				req.query.jobseekerId
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

	updateprofile = async(req, res) => {


		const { jobseekerId, firstName, lastName, profilePicture='', resumes=[], coverLetters=[], contactNumber, street, apt, city, state, country, zip, savedJobs=[]} = req.body;
 
		const address = {
			street: street,
			apt : apt,
			city : city,
			state : state,
			country : country,
			zip : zip
		}

        console.log(req.body);
        const update = { firstName, lastName, profilePicture, resumes, coverLetters, contactNumber, address, savedJobs }
        const result = await JobSeekerDetails.findByIdAndUpdate(jobseekerId, update, { new:true });
        console.log(result);
        res.status(200).send(result);
	};


}

export default JobSeekerController;
