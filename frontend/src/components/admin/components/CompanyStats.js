import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, Typography, Card } from "@material-ui/core";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink as HeaderNavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import theme from "../../common/MenuTheme";
import AdminHeader from "../AdminHeader";
import endPointObj from "../../../endPointUrl";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  reviewCard: {
    padding: "20px",
    margin: "10px",
  },
  jobsParent: {
    paddingLeft: "300px",
    paddingRight: "300px",
  },
  headerWrapper: {
    width: "600px",
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    color: "black",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  pointer: {
    cursor: "pointer",
    fontWeight: "bold",
  },
  tabContent: {
    padding: "20px",
  },
  flex: {
    display: "flex",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  findJobs: {
    textAlign: "center",
    borderRadius: "30px",
    padding: "10px",
    boxShadow: "none",
    border: "3px solid #085ff7",
    width: "50%",
    backgroundColor: "#085ff7",
    color: "#ffffff",
    fontStyle: "Open Sans",
    fontWeight: "bold",
    height: "150%",
    "&:hover": {
      backgroundColor: "#103a7d",
      color: "#ffffff",
      textDecoration: "none",
    },
  },
  applyNow: {
    textAlign: "center",
    borderRadius: "30px",
    marginRight: "10px",
    boxShadow: "none",
    border: "3px solid #085ff7",
    backgroundColor: "#085ff7",
    color: "#ffffff",
    fontStyle: "Open Sans",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#103a7d",
      border: "3px solid #103a7d",
      color: "#ffffff",
      textDecoration: "none",
    },
  },
  bottomBorder: {
    borderBottom: "1px solid #085ff7",
    marginBottom: "5px",
    paddingBottom: "10px",
  },
  deleteIcon: {
    cursor: "pointer",
  },
}));

export const CompanyStats = (props) => {
  const classes = useStyles();

  const [company, setCompany] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const [allReviews, setReviews] = useState();
  const [jobStats, setJobStats] = useState();

  useEffect(() => {
    async function fetchData() {
      const company = props.location.state.company;
      console.log({ company }, props);
      setCompany(company);
      const [reviews, stats] = await Promise.all([
        axios.get(
          `${endPointObj.url}/admin/get-accepted-rejected-reviews-for-company/${company._id}`
        ),
        axios.get(
          `${endPointObj.url}/employer/get-applicants-for-each-job/${company._id}`
        ),
      ]);
      console.log({ reviews, stats });
      if (reviews.status === 200) setReviews(reviews.data);
      if (stats.status === 200) setJobStats(stats.data);
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AdminHeader />
      <hr style={{ margin: "0" }} />
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            backgroundColor: "#d4d4d4",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "20vh",
            padding: "20px",
          }}
        >
          <div
            style={{
              color: "black",
            }}
          >
            <Typography variant="h3">{`${company?.companyName}`}</Typography>
            <div>
              <span>{`${company?.websiteUrl}`}</span>
              <br />
              <span>{`${company?.headquarters}`}</span>
              <br />
            </div>
          </div>
          <br />
        </div>
        <div>
          <Nav tabs>
            <NavItem>
              <HeaderNavLink
                className={classnames(
                  { active: activeTab === "1" },
                  classes.pointer
                )}
                onClick={() => {
                  setActiveTab("1");
                }}
              >
                <p className="black b">Reviews</p>
              </HeaderNavLink>
            </NavItem>
            <NavItem className="black">
              <HeaderNavLink
                className={classnames(
                  { active: activeTab === "2" },
                  classes.pointer
                )}
                onClick={() => {
                  setActiveTab("2");
                }}
              >
                <p className="black b">Job Stats</p>
              </HeaderNavLink>
            </NavItem>
          </Nav>
          <TabContent className={classes.tabContent} activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col>
                  {allReviews !== undefined && allReviews.length > 0 ? (
                    allReviews.map((review) => {
                      return (
                        <Card
                          key={review._id}
                          className={classnames(
                            classes.reviewCard,
                            classes.bottomBorder
                          )}
                        >
                          <li
                            className={classnames(classes.flex, classes.column)}
                          >
                            <div
                              className={classnames(
                                classes.flex,
                                classes.spaceBetween
                              )}
                            >
                              <Typography
                                component="body1"
                                className={classnames(classes.jobTitle)}
                              >
                                {review.reviewTitle}
                              </Typography>
                              <div className={classnames(classes.flex)}>
                                <Typography variant="body2" component="div">
                                  <em>{review.isReviewApprovedByAdmin}</em>
                                </Typography>
                              </div>
                            </div>
                            <span>{review.reviewBody}</span>
                          </li>
                        </Card>
                      );
                    })
                  ) : (
                    <>
                      <div
                        className={classnames(
                          classes.flex,
                          classes.center,
                          classes.column
                        )}
                      >
                        <h5>No Reviews</h5>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  {jobStats !== undefined && jobStats.length > 0 ? (
                    jobStats.map((job) => {
                      return (
                        <Card
                          key={job.jobId}
                          className={classnames(
                            classes.reviewCard,
                            classes.bottomBorder
                          )}
                        >
                          <li
                            className={classnames(classes.flex, classes.column)}
                          >
                            <div
                              className={classnames(
                                classes.flex,
                                classes.spaceBetween
                              )}
                            >
                              <Typography
                                component="body1"
                                className={classnames(classes.jobTitle)}
                              >
                                {job.jobTitle}
                              </Typography>
                            </div>
                            <div className={classnames(classes.flex)}>
                              <div
                                className={classnames(
                                  classes.flex,
                                  classes.column
                                )}
                                style={{ margin: "10px" }}
                              >
                                <Typography
                                  component="body1"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Hired
                                </Typography>
                                <span style={{ textAlign: "center" }}>
                                  {job.numberHired}
                                </span>
                              </div>
                              <div
                                className={classnames(
                                  classes.flex,
                                  classes.column
                                )}
                                style={{ margin: "10px" }}
                              >
                                <Typography
                                  component="body1"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Rejected
                                </Typography>
                                <span style={{ textAlign: "center" }}>
                                  {job.numberRejected}
                                </span>
                              </div>
                            </div>
                          </li>
                        </Card>
                      );
                    })
                  ) : (
                    <>
                      <div
                        className={classnames(
                          classes.flex,
                          classes.center,
                          classes.column
                        )}
                      >
                        <h5>No Jobs Created.</h5>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </ThemeProvider>
  );
};
