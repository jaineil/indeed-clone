import TestReview from "../../../db/models/testReviews.js";
import client from "../../../db/config/redis.config.js";

export const test = async (data, callback) => {
	const results = await TestReview.find({});
	client.set("test-reviews", JSON.stringify(results));
	console.log("Found from DB");
	callback(null, results);
};
