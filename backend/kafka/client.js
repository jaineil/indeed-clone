import { KafkaRPC } from "./kafkarpc.js";

export const make_request = (topicName, message, callback) => {
	const rpc = new KafkaRPC();
	rpc.makeRequest(topicName, message, (err, response) => {
		if (err) {
			console.error(err);
		} else {
			callback(null, response);
		}
	});
};
