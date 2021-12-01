import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
	jobSeekerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "jobSeekerDetail",
	},
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: "companyDetail" },
	companyName: { type: String },
	overallCompanyRatingByReviewer: { type: Number },
	reviewerRole: { type: String },
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
	postedOn: { type: Date, default: Date.now },
	companyLocation: {
		type: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zipcode: { type: String },
		},
	},
	reviewHelpfulCount: { type: Number, default: 0 },
	reviewNotHelpfulCount: { type: Number, default: 0 },
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
	isReviewApprovedByAdmin: { type: String, default: "PENDING" }, // enum: PENDING/APPROVED/REJECTED
});

const Reviews = mongoose.model("review", reviewsSchema);

export default Reviews;
