import React, { useState, useSelector } from "react";
import { ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";

import Header from "../../common/Header";
import theme from "../../common/MenuTheme";
import { useStyles } from "./Styles";

import salariesImg from "../../../images/job-seeker/salaries.png";
import axios from "axios";
import endPointObj from "../../../endPointUrl";

const SearchJobs = ({
  jobTitle,
  setJobTitle,
  location,
  setLocation,
  handleSubmit,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.searchParentContainer}>
      <div className={classes.searchImgContainer}>
        <img className={classes.salaryImg} src={salariesImg} alt="search-img" />
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
            <form className={classes.searchForm} onSubmit={handleSubmit}>
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

const AverageSalaryCard = ({ jobTitle, location, averageSalary }) => {
  const classes = useStyles();
  return (
    <>
      {averageSalary !== undefined &&
      averageSalary !== "" &&
      jobTitle !== "" &&
      location !== "" ? (
        <>
          <h2
            style={{ margin: "15px" }}
          >{`${jobTitle} salary in ${location}`}</h2>
          <div className={classes.blueBorder}></div>
          <Card variant="outlined" style={{ width: "794px" }}>
            <CardContent>
              <Typography
                variant="body1"
                component="div"
                style={{ fontSize: "1.4rem", fontWeight: "bold" }}
              >
                Average Base Salary
              </Typography>
              <Typography
                variant="h4"
                component="div"
                style={{ padding: "15px", fontWeight: "bold" }}
              >
                {`$ ${averageSalary}`}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                style={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                per year
              </Typography>
              <Typography
                variant="body1"
                component="div"
                style={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                {`The average salary for a ${jobTitle} is $ ${averageSalary} per year in ${location}`}
              </Typography>
            </CardContent>
          </Card>
        </>
      ) : jobTitle !== "" &&
        location !== "" &&
        (averageSalary === undefined || averageSalary !== "") ? (
        <div>
          <Typography
            variant="body1"
            component="div"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {`No Salaries recorded for a ${jobTitle} in ${location}`}
          </Typography>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

const CompanyCard = ({ jobTitle, location, topCompanies }) => {
  const classes = useStyles();
  return (
    <>
      {topCompanies !== undefined &&
      topCompanies.length > 0 &&
      jobTitle !== "" &&
      location !== "" ? (
        <div>
          <h3>{`Top companies for ${jobTitle} in ${location}`}</h3>
          <Card variant="outlined">
            {topCompanies.map((company) => {
              return (
                <CardContent>
                  <div className={classes.flexSpaceBetween}>
                    <Typography
                      variant="body1"
                      component="div"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      <Link
                        to={{
                          pathname: "/companyhome",
                          state: { companyId: company._id },
                        }}
                        style={{ textDecoration: "none" }}
                      >{`${company.companyName}`}</Link>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      {`$ ${company.averageSalary} per year`}
                    </Typography>
                  </div>
                  <Typography variant="body1" component="div">
                    <p>{`${company.numberOfReviews} Reviews`}</p>
                    <p>{`${company.numberOfSalaries} Salaries Reported`}</p>
                  </Typography>
                  <hr />
                </CardContent>
              );
            })}
          </Card>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

const FindSalaries = () => {
  const classes = useStyles();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [averageSalary, setAverageSalary] = useState("");
  const [topCompanies, setTopCompanies] = useState([]);
  const isAuth = localStorage.getItem('userId') ? true : false;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Criteria: ", jobTitle, location);
    axios
      .get(
        endPointObj.url +
          `/job-seeker/search-salary-for-role?jobTitle=${jobTitle}&location=${location}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("Salary Response : ", res.data.response);
          setAverageSalary(res.data.response.overallAverageSalary);
          setTopCompanies(res.data.response.highestPayingCompanies);
        } else {
          setAverageSalary("");
          setTopCompanies([]);
        }
      })
      .catch((err) => {
        console.log("Err in salary search: ", err);
        setAverageSalary("");
        setTopCompanies([]);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      {isAuth ? (<Header />): <><br/><br/></> }
			<br/>
      <hr style={{ marginBottom: "0" }} />
      <SearchJobs
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmit}
      />
      {console.log("Salaries: ", averageSalary, topCompanies)}
      <div className={classes.resultContainer}>
        <AverageSalaryCard
          jobTitle={jobTitle}
          location={location}
          averageSalary={averageSalary}
        />
        <br />
        <CompanyCard
          jobTitle={jobTitle}
          location={location}
          topCompanies={topCompanies}
        />
      </div>
    </ThemeProvider>
  );
};

export default FindSalaries;
