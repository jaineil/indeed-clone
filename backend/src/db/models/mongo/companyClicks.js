import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companyClicksSchema = new Schema({
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: "companyDetail" },
	companyName: { type: String },
	date: { type: Date, default: Date.now },
	clicks: { type: Number, default: 0 },
});

const CompanyClicks = mongoose.model("companyclicks", companyClicksSchema);

export default CompanyClicks;
