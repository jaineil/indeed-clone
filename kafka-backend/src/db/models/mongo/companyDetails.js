import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companyDetailsSchema = new Schema({
	companyName: { type: String },
	websiteUrl: { type: String },
	companySize: { type: String },
	companyType: { type: String },
	revenue: { type: String },
	headquarters: { type: String },
	industry: { type: String },
	founded: { type: String },
	ceoName: { type: String },
	averageRating: { type: Number },
	description: {
		about: String,
		workCulture: String,
		values: String,
		missionAndVision: String,
	},
	companyLocation: {
		city: { type: String },
		state: { type: String },
		zipcode: { type: String },
		country: { type: String },
	},
	reviewCount: { type: Number, default: 0 },

	featuredReviews: [
		{
			reviewId: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
		},
	],
});

const CompanyDetails = mongoose.model("companyDetail", companyDetailsSchema);

export default CompanyDetails;
