import React, { useState, useEffect } from "react";
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

import Header from "../../common/Header";
import theme from "../../common/MenuTheme";
import { useStyles } from "./Styles";

import salariesImg from "../../../images/job-seeker/salaries.png";

const SearchJobs = () => {
  const classes = useStyles();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("Search Criteria: ", jobTitle, location);
    alert("Job Search");
    setJobTitle("");
    setLocation("");
  };
  return (
    <div className={classes.searchParentContainer}>
      <div className={classes.searchImgContainer}>
        <img className={classes.salaryImg} src={salariesImg} alt />
      </div>
      <div className={classes.searchContentParent}>
        <div className={classes.searchContentContainer}>
          <div className={classes.searchHeaderWrapper}>
            <h1
              style={{
                margin: "0",
                color: "#2d2d2d",
                fontWeight: "700",
                fontSize: "1.5rem",
                marginBottom: "0.25rem",
              }}
            >
              <span>Find a career you'll love</span>
            </h1>
            <span>
              Explore which careers have the highest job satisfaction, best
              salaries, and more
            </span>
          </div>
          <div className={classes.blueBorder}></div>
          <div className={classes.searchInputWrapper}>
            <form className={classes.searchForm} onSubmit={handleSumbit}>
              <div className={classes.inputWrapper}>
                <div>
                  <div>
                    <span>
                      <TextField
                        variant="outlined"
                        label="Job Title"
                        style={{ width: "100%", marginTop: "10px" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setJobTitle(e.target.value);
                        }}
                        value={jobTitle}
                        required
                        autoFocus
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className={classes.inputWrapper}>
                <div>
                  <div>
                    <span>
                      <TextField
                        variant="outlined"
                        label="Location"
                        style={{ width: "100%", marginTop: "10px" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setLocation(e.target.value);
                        }}
                        value={location}
                        required
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className={classes.inputWrapper}>
                <Button type="submit" className={classes.searchButton}>
                  <span>Search</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const AverageSalaryCard = () => {};

const CompanyCard = () => {};

const FindSalaries = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <hr style={{ marginBottom: "0" }} />
      <SearchJobs />
    </ThemeProvider>
  );
};

export default FindSalaries;
