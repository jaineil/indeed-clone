import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
	jobSeekerId: { type: String },
	companyId: { type: String },
	companyName: { type: String },
	overallCompanyRatingByReviewer: { type: Number },
	reviewTitle: { type: String },
	reviewBody: { type: String },
	pros: {
		type: [String],
		default: [],
	},
	cons: {
		type: [String],
		default: [],
	},
	ceoApprovalRating: { type: Number },
	interviewTips: {
		type: [String],
		default: [],
	},
	postedOn: { type: String },
	companyLocation: {
		type: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zipcode: { type: String },
		},
	},
	reviewHelpfulCount: { type: Number },
	reviewNotHelpfulCount: { type: Number },
	categoricalRating: {
		// each is 1 to 5 int-type rating scale
		type: {
			workLifeBalance: { type: Number },
			compensationAndBenefits: { type: Number },
			jobSecurityAndAdvancement: { type: Number },
			management: { type: Number },
			jobCulture: { type: Number },
		},
	},
	isReviewApprovedByAdmin: { type: String }, // enum: PENDING/APPROVED/REJECTED
});

const Reviews = mongoose.model("review", reviewsSchema);

export default Reviews;
