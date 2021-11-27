import { make_request } from "../../../../kafka/client.js";
class SearchController {
	searchSalaries = async (req, res) => {
		console.log("Inside search controller, about to make Kafka request");

		const message = {};
		message.body = req.query;
		message.path = req.path;
		make_request("search-salary", message, (err, results) => {
			if (err) {
				console.error(err);
				res.json({
					status: "Error",
					msg: "System error, try again",
				});
			} else {
				console.log(
					"Searched for companies by salary with kafka-backend"
				);
				console.log(results);
				res.json(results);
				res.end();
			}
		});
	};
}

export default SearchController;
