import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companyPhotosSchema = new Schema({
	jobSeekerId: { type: String },
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "companyDetail",
	},
	photoTitle: { type: String },
	companyPhotoUrl: { type: String },
	isPhotoApprovedByAdmin: { type: String, default: "PENDING" },
});

const CompanyPhotos = mongoose.model("companyPhoto", companyPhotosSchema);

export default CompanyPhotos;
