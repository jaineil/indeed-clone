import TestReview from "../../../db/models/testReviews.js";
import { randomBytes } from "crypto";

export class TestController {
  fetch = async (req, res) => {
    try {
      console.log(req);
      const results = await TestReview.find({});
      console.log("Query result", results);
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Could not fetch test reviews");
    }
  };

  insert10K = async (req, res) => {
    try {
      let allReviews = [];
      for (let i = 0; i < 10000; i++) {
        console.log("Review: ", i + 1);
        allReviews.push({
          reviewBody: randomBytes(20).toString("hex"),
        });
      }
      const results = await TestReview.insertMany(allReviews);
      // console.log("Query result", results);
      res.status(200).send("done!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Could not insert reviews");
    }
  };
}
