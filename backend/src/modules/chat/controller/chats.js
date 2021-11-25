import { make_request } from "../../../../kafka/client.js";
// import client from "../../../db/config/redis.config.js";

export class ChatsController {
	sendNewMessage = async (req, res) => {
		console.log("Inside chats controller, about to make Kafka request");

		const message = {};
		message.body = req.body;
		message.path = req.route.path;

		make_request("chat", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log("Added new message to chat with kafka-backend");
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};

	sendMessage = async (req, res) => {
		console.log("Inside chats controller, about to make Kafka request");

		const message = {};
		message.body = req.body;
		message.path = req.route.path;

		make_request("chat", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log(
					"Added subsequent message to chat with kafka-backend"
				);
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};
}

export default ChatsController;
