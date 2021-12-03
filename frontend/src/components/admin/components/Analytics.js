import React, { useState, useEffect } from "react";
import axios from "axios";
import endPointObj from "../../../endPointUrl";
import { Container, Card, Row, Col } from "reactstrap";

import { Top5ReviewedCompaniesChart } from "./charts/top5reviewedCompanies";
import { Top5AvgRatedCompaniesChart } from "./charts/top5avgRatedCompanies";
import { Top5JobSeekerReviewsChart } from "./charts/top5jobseekerReviews";
import { Top10CeoRatingsChart } from "./charts/top10ceoRatings";
import { Top10CompaniesViewedChart } from "./charts/top10viewedCompanies";
import { ReviewsPerDayChart } from "./charts/reviewsPerDay";

export const Analytics = () => {
  const [reviewsPerDay, setReviewsPerDay] = useState();
  const [top5reviewedCompanies, setTop5reviewedCompanies] = useState();
  const [top5avgRatedCompanies, setTop5avgRatedCompanies] = useState();
  const [top5jobseekerReviews, setTop5jobseekerReviews] = useState();
  const [top10ceoRatings, setTop10ceoRatings] = useState();
  const [top10viewedCompanies, setTop10viewedCompanies] = useState();

  useEffect(() => {
    async function fetchData() {
      const [
        reviewsPDay,
        reviewedCompanies,
        avgRatedCompanies,
        jobseekerReviews,
        ceoRatings,
        viewedCompanies,
      ] = await Promise.all([
        axios.get(`${endPointObj.url}/admin/reviews-per-day/`),
        axios.get(`${endPointObj.url}/admin/top-5-reviewed-companies`),
        axios.get(`${endPointObj.url}/admin/top-5-companies-average-rating`),
        axios.get(
          `${endPointObj.url}/admin/top-5-job-seekers-accepted-reviews`
        ),
        axios.get(`${endPointObj.url}/admin/top-ceos`),
        axios.get(`${endPointObj.url}/job-seeker/top-10-viewed-companies`),
      ]);
      if (reviewsPDay.status === 200) {
        setReviewsPerDay(reviewsPDay.data);
      }
      if (reviewedCompanies.status === 200) {
        setTop5reviewedCompanies(reviewedCompanies.data);
      }
      if (avgRatedCompanies.status === 200) {
        setTop5avgRatedCompanies(avgRatedCompanies.data);
      }
      if (jobseekerReviews.status === 200) {
        setTop5jobseekerReviews(jobseekerReviews.data);
      }
      if (ceoRatings.status === 200) {
        setTop10ceoRatings(ceoRatings.data);
      }
      if (viewedCompanies.status === 200) {
        setTop10viewedCompanies(viewedCompanies.data);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h3 style={{ color: "#05164d" }}>
        <em>Analytics Dashboard</em>
      </h3>
      <Container fluid className="content-wrapper">
        <Row
          md="auto"
          style={{
            justifyContent: "space-evenly",
          }}
        >
          <Col className="review-per-day" md="auto">
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
                margin: "10px",
                padding: "20px",
                animation: "fade 3s",
                backgroundColor: "#ffffff",
                animation: "alternate 2sec",
              }}
            >
              {reviewsPerDay ? (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <ReviewsPerDayChart reviews={reviewsPerDay} />
                </div>
              ) : (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <ReviewsPerDayChart reviews={[]} />
                </div>
              )}
            </Card>
          </Col>
          <Col className="top-5-reviewed-companies" md="auto">
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
                margin: "10px",
                padding: "20px",
                animation: "fade 3s",
                backgroundColor: "#ffffff",
                animation: "alternate 2sec",
              }}
            >
              {top5reviewedCompanies ? (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top5ReviewedCompaniesChart
                    companies={top5reviewedCompanies}
                  />
                </div>
              ) : (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top5ReviewedCompaniesChart companies={[]} />
                </div>
              )}
            </Card>
          </Col>
          <Col className="top-10-companies-views-pday" md="auto">
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
                margin: "10px",
                padding: "20px",
                animation: "fade 3s",
                backgroundColor: "#ffffff",
                animation: "alternate 2sec",
              }}
            >
              {top10viewedCompanies ? (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top10CompaniesViewedChart companies={top10viewedCompanies} />
                </div>
              ) : (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top10CompaniesViewedChart companies={[]} />
                </div>
              )}
            </Card>
          </Col>
          <Col className="top-5-avg-rating-companies" md="auto">
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
                margin: "10px",
                padding: "20px",
                animation: "fade 3s",
                backgroundColor: "#ffffff",
                animation: "alternate 2sec",
              }}
            >
              {top5avgRatedCompanies ? (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top5AvgRatedCompaniesChart
                    companies={top5avgRatedCompanies}
                  />
                </div>
              ) : (
                <>
                  <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                    <Top5AvgRatedCompaniesChart companies={[]} />
                  </div>
                </>
              )}
            </Card>
          </Col>
          <Col className="top-10-ceos-on-rating" md="auto">
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
                margin: "10px",
                padding: "20px",
                animation: "fade 3s",
                backgroundColor: "#ffffff",
                animation: "alternate 2sec",
              }}
            >
              {top10ceoRatings ? (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top10CeoRatingsChart ceos={top10ceoRatings} />
                </div>
              ) : (
                <>
                  <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                    <Top10CeoRatingsChart ceos={[]} />
                  </div>
                </>
              )}
            </Card>
          </Col>
          <Col className="top-5-accepted-reviews-jobseeker" md="auto">
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
                margin: "10px",
                padding: "20px",
                animation: "fade 3s",
                backgroundColor: "#ffffff",
                animation: "alternate 2sec",
              }}
            >
              {top5jobseekerReviews ? (
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top5JobSeekerReviewsChart jobseekers={[]} />
                </div>
              ) : (
                <>
                  <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                    <Top5JobSeekerReviewsChart jobseekers={[]} />
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
