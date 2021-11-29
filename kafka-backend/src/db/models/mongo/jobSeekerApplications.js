import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobSeekerApplicationsSchema = new Schema({
	jobId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "job",
	},
	jobSeekerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "jobSeekerDetail",
	},
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "companyDetail",
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
