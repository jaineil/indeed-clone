import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employerDetailsSchema = new Schema({
	userId: { type: Number }, // SQL user id
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "companyDetail",
	},
	firstName: { type: String },
	lastName: { type: String },
	emailId: { type: String },
	companyName: { type: String },
	role: { type: String },
	contactNumber: { type: String },
	companyLocation: {
		type: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zipcode: { type: String },
		},
	},
});

const EmployerDetails = mongoose.model("employerDetail", employerDetailsSchema);

export default EmployerDetails;
