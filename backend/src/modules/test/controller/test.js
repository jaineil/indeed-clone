import TestReview from "../../../db/models/testReviews.js";

export class TestController {
  fetch = async (req, res) => {
    try {
      console.log(req);
      const results = await TestReview.insertOne({});
      console.log("Query result", results);
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Could not fetch test reviews");
    }
  };
}
