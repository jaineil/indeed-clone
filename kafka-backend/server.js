import mongoose from "mongoose";
import { ConnectionProvider } from "./kafka/connection.js";
import mongoUri from "../kafka-backend/src/db/config/mongo.config.js";
// import { test } from "./src/modules/test/controller/test.js";
import handleChatRequest from "./services/chats.js";
import handleSearchRequest from "./services/search.js";
import handleJobRequest from "./services/jobs.js";
import handleCompanyRequest from "./services/companies.js";
import handleJobSeekerRequest from "./services/jobSeekers.js";
import handleJobApplicationRequest from "./services/applications.js";
import handleReviewRequest from "./services/reviews.js";

try {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500,
  });
  console.log("Mongoose is connected!");
} catch (err) {
  console.error("Could not connect Mongoose => ", err);
}

const handleTopicRequest = (topicName, functionName) => {
  const connection = new ConnectionProvider();
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();

  console.log("Kafka server is running!");

  consumer.on("message", (message) => {
    console.log("Message received for topic => ", topicName);
    console.log("Incoming message => ", message);
    const data = JSON.parse(message.value);

    functionName(data.data, (err, res) => {
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];

      producer.send(payloads, (err, data) => {
        if (err) console.error(err);
        console.log("Payload sent back to producer => ", data);
      });

      return;
    });
  });
};

// handleTopicRequest("get-test-reviews", test);
handleTopicRequest("chat", handleChatRequest);
handleTopicRequest("searches", handleSearchRequest);
handleTopicRequest("job", handleJobRequest);
handleTopicRequest("company", handleCompanyRequest);
handleTopicRequest("job-seeker", handleJobSeekerRequest);
handleTopicRequest("job-application", handleJobApplicationRequest);
handleTopicRequest("review", handleReviewRequest);
