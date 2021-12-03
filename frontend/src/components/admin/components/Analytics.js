import React, { useState, useEffect } from "react";
import axios from "axios";
import endPointObj from "../../../endPointUrl";
import {
  Container,
  Card,
  Row,
  Col,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Typography } from "@mui/material";

import { Top5ReviewedCompaniesChart } from "./charts/top5reviewedCompanies";
import { Top5AvgRatedCompaniesChart } from "./charts/top5avgRatedCompanies";
import { Top5JobSeekerReviewsChart } from "./charts/top5jobseekerReviews";
import { Top10CeoRatingsChart } from "./charts/top10ceoRatings";
import { Top10CompaniesViewedChart } from "./charts/top10viewedCompanies";

export const Analytics = () => {
  const [top5reviewedCompanies, setTop5reviewedCompanies] = useState();
  const [top5avgRatedCompanies, setTop5avgRatedCompanies] = useState();
  const [top5jobseekerReviews, setTop5jobseekerReviews] = useState();
  const [top10ceoRatings, setTop10ceoRatings] = useState();
  const [top10viewedCompanies, setTop10viewedCompanies] = useState();
  useEffect(async () => {
    const [
      reviewedCompanies,
      avgRatedCompanies,
      jobseekerReviews,
      ceoRatings,
      viewedCompanies,
    ] = await Promise.all([
      axios.get(`${endPointObj.url}/admin/top-5-reviewed-companies`),
      axios.get(`${endPointObj.url}/admin/top-5-companies-average-rating`),
      axios.get(`${endPointObj.url}/admin/top-5-job-seekers-accepted-reviews`),
      axios.get(`${endPointObj.url}/admin/top-ceos`),
      axios.get(`${endPointObj.url}/admin/top-ceos`),
    ]);
    console.log({
      reviewedCompanies,
      avgRatedCompanies,
      jobseekerReviews,
      ceoRatings,
      viewedCompanies,
    });
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
    console.log({
      top5reviewedCompanies,
      top5avgRatedCompanies,
      top5jobseekerReviews,
      top10ceoRatings,
      top10viewedCompanies,
    });
  }, []);
  return (
    <div>
      <h3 style={{ color: "#343a40" }}>Analytics Dashboard</h3>
      <Container fluid classeName="content-wrapper">
        <Row md="auto">
          <Col className="review-per-day" xs={2}>
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
              <div style={{ font: "1.475rem", fontWeight: "bold" }}>5</div>
              <Typography variant="h6">Reviews/Day</Typography>
            </Card>
          </Col>
          <Col className="top-5-reviewed-companies" md="8">
            {top5reviewedCompanies ? (
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
                <div style={{ font: "1.475rem", fontWeight: "bold" }}>
                  <Top5ReviewedCompaniesChart
                    companies={top5reviewedCompanies}
                  />
                </div>
              </Card>
            ) : (
              <div>No company has been reviewed yet.</div>
            )}
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
                  <CardTitle>
                    <Typography variant="h6">
                      Top 5 Companies (Avg. Rating)
                    </Typography>
                  </CardTitle>
                  <div>No company has been rated yet.</div>
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
                  {/* <Top5JobSeekerReviewsChart
                    jobseekers={top5jobseekerReviews}
                  /> */}
                </div>
              ) : (
                <>
                  <CardTitle>
                    <Typography variant="h6">
                      Top 5 Job Seekers (Accepted Reviews)
                    </Typography>
                  </CardTitle>
                  <div>Job Seeker reviews have not been accepted.</div>
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
                  <CardTitle>
                    <Typography variant="h6">Top 10 CEOs</Typography>
                  </CardTitle>
                  <div>No CEO has been rated yet.</div>
                </>
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
                <>
                  <CardTitle>
                    <Typography variant="h6">
                      Top 10 Companies (Views)
                    </Typography>
                  </CardTitle>
                  <div>No company has view data.</div>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
