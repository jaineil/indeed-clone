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
				jobTitle: req.body.jobTitle,
				jobLocation: req.body.jobLocation,
				salary: parseInt(req.body.salary),
				yearsOfExperience: req.body.yearsOfExperience,
				benefits: {
					paidTimeOff:
						req.body.benefits.paidTimeOff === "on" ? true : false,
					healthInsurance:
						req.body.benefits.healthInsurance === "on"
							? true
							: false,
					lifeInsurance:
						req.body.benefits.lifeInsurance === "on" ? true : false,
					dentalOrVisionInsurance:
						req.body.benefits.dentalOrVisionInsurance === "on"
							? true
							: false,
					retirement401k:
						req.body.benefits.retirement === "on" ? true : false,
				},
			});
			const response = await newJobRecord.save();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};
}

export default JobRecordController;
