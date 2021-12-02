import mongoose from "mongoose";
import moment from "moment";

const Schema = mongoose.Schema;

const companyClicksSchema = new Schema({
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: "companyDetail" },
	companyName: { type: String },
	date: { type: String, default: moment().format("MM-DD-YYYY") },
	clicks: { type: Number, default: 0 },
});

const CompanyClicks = mongoose.model("companyclick", companyClicksSchema);

export default CompanyClicks;
