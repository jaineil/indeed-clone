import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobSeekerApplicationsSchema = new Schema({
	jobId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "jobs",
	},
	jobSeekerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "jobSeekerDetails",
	},
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "companyDetails",
	},
	companyName: { type: String },
	applicationStatus: { type: String },
	resume: {
		type: {
			resumeId: { type: String },
			url: { type: String },
			name: { type: String },
		},
	},
	coverLetter: {
		type: {
			coverLetterId: { type: String },
			url: { type: String },
			name: { type: String },
		},
	},
});

const JobSeekerApplications = mongoose.model(
	"jobSeekerApplication",
	jobSeekerApplicationsSchema
);

export default JobSeekerApplications;
