import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ThemeProvider } from "@material-ui/core";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import { Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
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
import { Link, NavLink } from "react-router-dom";
import Header from "../../../common/Header";
import { useStyles } from "./Styles";
import theme from "../../../common/MenuTheme";
import { getProfile } from "../../../../_actions/jobseekerActions";
import {
  savedJobsSelector,
  appliedJobsSelector,
} from "../../../../_reducers/jobseekerReducer";
import endPointObj from "../../../../endPointUrl";
import JobDescription from "../../jobs/JobDescription";

const MyJobs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const mongoId = useSelector((state) => state.login.user.mongoId);
  const savedJobs = useSelector(savedJobsSelector);
  const appliedJobs = useSelector(appliedJobsSelector);

  const [activeTab, setActiveTab] = useState("1");
  const [show, setShow] = useState(false);
  const [curJobId, setCurJobId] = useState("");
  const { isAuth } = useSelector((state) => state.login);

  const unsaveJob = (jobId) => {
    const body = {
      jobSeekerId: mongoId,
      jobId: jobId,
    };
    axios
      .put(`${endPointObj.url}/job-seeker/unsave-job`, body)
      .then((res) => {
        console.log("UnSave Response: ", res);
        dispatch(getProfile(mongoId));
      })
      .catch((err) => {
        console.log("Error in un-save job: ", err);
      });
  };

  useEffect(() => {
    dispatch(getProfile(mongoId));
  }, [dispatch, mongoId]);

  return (
    <ThemeProvider theme={theme}>
      {isAuth ? (
        <Header />
      ) : (
        <>
          <br />
          <br />
        </>
      )}
      <br />
      <hr />
      <div className={classes.jobsParent}>
        <div className={classes.headerWrapper}>
          <h1>My Jobs</h1>
        </div>
        <br />
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
                <p className="black b">Saved</p>
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
                <p className="black b">Applied</p>
              </HeaderNavLink>
            </NavItem>
          </Nav>
          <TabContent className={classes.tabContent} activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col>
                  {savedJobs !== undefined && savedJobs.length > 0 ? (
                    savedJobs.map((job) => {
                      return (
                        <div key={job.jobId}>
                          <li
                            className={classnames(
                              classes.flex,
                              classes.column,
                              classes.bottomBorder
                            )}
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurJobId(job.jobId);
                                  setShow(true);
                                }}
                              >
                                {job.jobTitle}
                              </Typography>
                              <div className={classnames(classes.flex)}>
                                <TurnedInIcon
                                  fontSize="large"
                                  className={classes.deleteIcon}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    unsaveJob(job.jobId);
                                  }}
                                />
                              </div>
                            </div>
                            <span>{job.companyName}</span>
                          </li>
                          {show && curJobId === job.jobId ? (
                            <Modal show={show} onHide={() => setShow(false)}>
                              <Modal.Header closeButton className="b f4">
                                <div
                                  className={classnames(
                                    classes.flex,
                                    classes.column
                                  )}
                                >
                                  <div>Job Description</div>
                                </div>
                              </Modal.Header>
                              <JobDescription jobData={job} />
                            </Modal>
                          ) : (
                            <div></div>
                          )}
                        </div>
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
                        <h5>No jobs saved yet</h5>
                        <Typography variant="body2">
                          Jobs you choose to save during a job search will be
                          shown here
                        </Typography>
                        <br />
                        <Typography
                          variant="contained"
                          component={NavLink}
                          to="/home"
                          className={classes.findJobs}
                        >
                          Find Jobs
                        </Typography>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  {appliedJobs !== undefined && appliedJobs.length > 0 ? (
                    appliedJobs.map((job) => {
                      return (
                        <div key={job.jobId}>
                          <li
                            className={classnames(
                              classes.flex,
                              classes.column,
                              classes.bottomBorder
                            )}
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurJobId(job.jobId);
                                  setShow(true);
                                }}
                              >
                                {job.jobTitle}
                              </Typography>
                              <div className={classnames(classes.flex)}>
                                <em>{job.applicationStatus}</em>
                              </div>
                            </div>
                            <span>{job.companyName}</span>
                          </li>
                          {show && curJobId === job.jobId ? (
                            <Modal show={show} onHide={() => setShow(false)}>
                              <Modal.Header closeButton className="b f4">
                                <div
                                  className={classnames(
                                    classes.flex,
                                    classes.column
                                  )}
                                >
                                  <div>Job Description</div>
                                </div>
                              </Modal.Header>
                              <JobDescription jobData={job} />
                            </Modal>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className={classnames(
                        classes.flex,
                        classes.center,
                        classes.column
                      )}
                    >
                      <h5>No applications yet</h5>
                      <Typography variant="body2">
                        Once you apply to jobs, you can track the status of the
                        applications here.
                      </Typography>
                      <br />
                      <Typography
                        variant="contained"
                        component={NavLink}
                        to="/home"
                        className={classes.findJobs}
                      >
                        Find Jobs
                      </Typography>
                    </div>
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

export default MyJobs;
