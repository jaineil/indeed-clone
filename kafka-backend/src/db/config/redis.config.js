import redis from "redis";
const client = redis.createClient();

client.on("connect", function (err) {
	if (err) {
		console.log("Error occurred while connecting to Redis");
	} else {
		console.log("Connected to Redis Client");
	}
});

export default client;
