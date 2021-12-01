import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core";
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
import { NavLink } from "react-router-dom";
import Header from "../../../common/Header";
import { useStyles } from "./Styles";
import theme from "../../../common/MenuTheme";
import { getProfile } from "../../../../_actions/jobseekerActions";
import { savedJobsSelector } from "../../../../_reducers/jobseekerReducer";
import endPointObj from "../../../../endPointUrl";

const MyReviews = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const mongoId = useSelector((state) => state.login.user.mongoId);
  const savedJobs = useSelector(savedJobsSelector);
  useEffect(() => {
    dispatch(getProfile(mongoId));
  }, [dispatch, mongoId]);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <hr />
      <div className={classes.reviewsParent}>
        <div className={classes.headerWrapper}>
          <h1>My Reviews</h1>
        </div>
        <br />
        <div>
          {savedJobs !== undefined && savedJobs.length > 0 ? (
            savedJobs.map((job) => {
              return (
                <div>
                  <li
                    className={classnames(
                      classes.flex,
                      classes.spaceBetween,
                      classes.bottomBorder
                    )}
                  >
                    <div className={classnames(classes.flex, classes.column)}>
                      <Typography
                        component={NavLink}
                        to="/home"
                        target="_blank"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.3rem",
                          color: "black",
                        }}
                      >
                        {job.jobTitle}
                      </Typography>
                      <span>{job.companyName}</span>
                    </div>
                  </li>
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
                <h5>No company reviews</h5>
                <Typography variant="body2">
                  Reviews you added for companies will be displayed here.
                </Typography>
                <br />
              </div>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MyReviews;
