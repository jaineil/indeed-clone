import { make_request } from "../../../../kafka/client.js";

export const kafkaTestController = async (req, res) => {
	make_request("get-test-reviews", req.params, (err, results) => {
		if (err) {
			console.error(err);
			res.json({
				status: "Error",
				msg: "System error, try again",
			});
		} else {
			console.log("Fetched all reviews with kafka-backend");
			console.log(results);
			res.json(results);
			res.end();
		}
	});
};
