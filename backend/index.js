import mongoose from "mongoose";
import mongoUri from "./src/db/config/mongo.config.js";
import app from "./app.js";

import testRouter from "./src/modules/test/router/test.js";
import kafkaTestRouter from "./src/modules/kafka-test/router/kafkaTestRouter.js";

try {
	mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		maxPoolSize: 500,
	});
	console.log("Mongoose` is connected!");
	app.listen(3001, () => {
		console.log("Server listening on port 3001");
	});
} catch (err) {
	console.error("Could not connect Mongoose => ", err);
}

//use routes
app.use(testRouter);
app.use(kafkaTestRouter);
