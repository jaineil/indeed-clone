import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employerDetailsSchema = new Schema({
	userId: { type: Number }, // SQL user id
	firstName: { type: String },
	lastName: { type: String },
	companyName: { type: String },
	role: { type: String },
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
