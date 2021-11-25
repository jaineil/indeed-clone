import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const companyPhotosSchema = new Schema({

   	userId: { type: String },
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "companyDetails",
	},
	companyPhotoUrl: { type: String },
	isPhotoApprovedByAdmin: { type: String },
});

const CompanyPhotos = mongoose.model('companyPhoto', companyPhotosSchema);

export default CompanyPhotos;