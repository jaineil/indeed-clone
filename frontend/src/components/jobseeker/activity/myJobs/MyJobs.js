import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink as HeaderNavLink,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import Header from "../../../common/Header";
import { useStyles } from "./Styles";
import theme from "../../../common/MenuTheme";
import { getProfile } from "../../../../_actions/jobseekerActions";
import { savedJobsSelector } from "../../../../_reducers/jobseekerReducer";
import endPointObj from "../../../../endPointUrl";

const MyJobs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const mongoId = useSelector((state) => state.login.user.mongoId);
  const savedJobs = useSelector(savedJobsSelector);
  const [activeTab, setActiveTab] = useState("1");
  useEffect(() => {
    dispatch(getProfile(mongoId));
  }, [dispatch, mongoId]);
  return (
    <ThemeProvider theme={theme}>
      <Header />
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
                    <div>Saved Jobs</div>
                  ) : (
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
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  {savedJobs !== undefined && savedJobs.length > 0 ? (
                    <div>Applied Jobs</div>
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
