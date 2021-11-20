import { make_request } from "../../../../kafka/client.js";
import client from "../../../db/config/redis.config.js";

export const kafkaTestController = async (req, res) => {
	client.get("test-reviews", async (err, reply) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error in fetching from redis client");
		} else {
			if (reply != null) {
				console.log("Found from cache");
				res.status(200).send(JSON.parse(reply));
			} else {
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
			}
		}
	});
};
