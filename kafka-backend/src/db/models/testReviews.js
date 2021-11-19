import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testReviewSchema = new Schema({
	reviewBody: { type: String },
});

const TestReview = mongoose.model("testReview", testReviewSchema);

export default TestReview;
