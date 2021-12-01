import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobRecordsSchema = new Schema({
	jobSeekerId: { type: String },
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "companyDetail",
	},
	companyName: { type: String },
	isCurrentEmployee: { type: Boolean },
	jobEndDate: { type: Date },
	salary: { type: Number },
	jobTitle: { type: String },
	jobLocation: {
		city: { type: String },
		state: { type: String },
		zipcode: { type: String },
		country: { type: String },
	},
	yearsOfExperience: { type: Number },
	benefits: {
		paidTimeOff: { type: Boolean },
		healthInsurance: { type: Boolean },
		lifeInsurance: { type: Boolean },
		dentalOrVisionInsurance: { type: Boolean },
		retirement401k: { type: Boolean },
		other: { type: String },
	},
});

const JobRecords = mongoose.model("jobRecord", jobRecordsSchema);

export default JobRecords;
