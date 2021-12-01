import JobRecords from "../../../db/models/mongo/jobRecords.js";

class JobRecordController {
	create = async (req, res) => {
		try {
			const newJobRecord = new JobRecords({
				jobSeekerId: req.body.jobSeekerId,
				companyId: req.body.companyId,
				companyName: req.body.companyName,
				isCurrentEmployee: req.body.isCurrentEmployee,
				jobEndDate: req.body.jobEndDate,
				jobTitle: req.body,
				jobLocation: req.body.jobLocation,
				annualSalary: parseInt(req.body.annualSalary),
				yearsOfExperience: req.body.yearsOfExperience,
				benefits: req.body.benefits,
			});
			const response = await newJobRecord.save();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};
}

export default JobRecordController;
