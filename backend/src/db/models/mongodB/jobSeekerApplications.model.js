import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobSeekerApplicationsSchema = new Schema({
	jobId: { type: mongoose.Types.ObjectId },
	jobSeekerId: { type: mongoose.Types.ObjectId },
	companyId: { type: String },
	companyName: { type: String },
	applicationStatus: { type: String },
	resume: {
		type: {
			_id: { type: mongoose.Types.ObjectId },
			url: { type: String },
			name: { type: String },
		},
	},
	coverLetter: {
		type: {
			_id: { type: mongoose.Types.ObjectId },
			url: { type: String },
			name: { type: String },
		},
	},
});

const JobSeekerApplications = mongoose.model(
	"jobSeekerApplications",
	jobSeekerApplicationsSchema
);

export default JobSeekerApplications;
