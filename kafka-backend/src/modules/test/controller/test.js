import TestReview from "../../../db/models/testReviews.js";

export const test = async (data, callback) => {
	try {
		console.log(data);
		const results = await TestReview.find({});
		console.log("Query result", results);
		callback(null, results);
	} catch (err) {
		console.error(err);
		callback(null, "Could not fetch test reviews");
	}
};
