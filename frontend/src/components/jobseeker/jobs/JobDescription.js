import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useReducer, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import endPointObj from "../../../endPointUrl";
import { getProfile, updateProfile } from "../../../_actions/jobseekerActions";
import { resumesSelector } from "../../../_reducers/jobseekerReducer";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "sticky",
    top: "20px",
    // marginLeft: "50px",
    alignSelf: "flex-start",
    border: "1px solid black",
    padding: "20px",
    flex: "1",
    borderRadius: "10px ",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    height: "53px",
    padding: "0 25px",
    fontSize: "20px",
    color: "white",

    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  job_title: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  resume_sub_title: {
    fontSize: ".75rem",
    fontWeight: 400,
    color: "#767676",
  },
  sub_details: {
    fontSize: "15px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function JobDescription({ jobData }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    companyName,
    city,
    jobTitle,
    salary,
    jobId,
    snippet,
    jobDescription,
  } = jobData;
  console.log("salary", salary);
  console.log(JSON.stringify(jobData));

  const mongoId = useSelector((state) => state.login.user.mongoId);
  const resumes = useSelector(resumesSelector);
  const [jobDetails, setJobDetails] = useState();

  useEffect(() => {
    console.log("Inside get job description");
    axios
      .get(endPointObj.url + `/job-seeker/job-details/${jobId}`)
      .then((response) => {
        console.log("Get job description response => ", response.data.response);
        setJobDetails(response.data.response);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log("Error", err.response);
        }
      });
  }, []);

  console.log("Job details - jobdescription", jobDetails);
  const hiddenFileInput = React.useRef(null);

  const applyJob = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const fileUploaded = e.target.files[0];
    const formData = new FormData();
    formData.append("file", fileUploaded);
    const applyData = {
      companyName: "",
    };
    axios
      .post(
        `${endPointObj.url}/job-seeker/job-details/apply?jobSeekerId=${mongoId}&resumeName=${fileUploaded.name}&jobId=${jobId}&companyId=${jobDetails.companyId}&companyName=${companyName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) dispatch(getProfile(mongoId));
      })
      .catch((err) => {
        console.log("Error while uploading Resume: ", err);
      });
  };
  return (
    <>
      {jobDetails ? (
        <Box className={classes.container}>
          <div>
            <Typography
              className={classes.job_title}
              style={{ marginBottom: "10px" }}
            >
              {jobTitle}
            </Typography>
            <Box style={{ marginBottom: "5px" }}>
              {/* Setting up current company id in locastorage to make it access to company homepage. */}
              {localStorage.setItem("currentcompanyid", jobDetails.companyId)}

              <Link
                to={{
                  pathname: "/companyHome",
                  state: { company: jobDetails.companyId },
                }}
                style={{
                  textDecoration: "none",
                  color: "#000000",
                }}
              >
                {companyName}
              </Link>
            </Box>
            <Box style={{ marginBottom: "5px" }}>{jobDetails.location}</Box>
            <Box style={{ marginBottom: "10px" }}>
              <u>{jobDetails.jobType}</u>
            </Box>
            <div>
              <Button
                color={"primary"}
                variant="contained"
                type="submit"
                // className={classes.applyJob}
                onClick={applyJob}
              >
                Apply
              </Button>
              <input
                type="file"
                id="resume"
                name="resume"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
          <Box style={{ marginBottom: "10px" }}>
            <Typography
              className={classes.job_title}
              style={{ marginBottom: "3px" }}
            >
              Resume Insights
            </Typography>
            <div className={classes.resume_sub_title}>
              Here’s how your resume aligns with the job description
            </div>
            <br />
            <b>Experience & Skills</b> <br />
            <div className={classes.sub_details}>{jobDetails.skillsNeeded}</div>
          </Box>
          <hr />
          <Box style={{ marginBottom: "10px" }}>
            <Typography
              className={classes.job_title}
              style={{ marginBottom: "14px" }}
            >
              Job details
            </Typography>
            <b>Job Type</b>
            <br />
            <div className={classes.sub_details}>{jobDetails.jobType}</div>
          </Box>
          <hr />
          <Box style={{ marginBottom: "10px" }}>
            <Typography
              className={classes.job_title}
              style={{ marginBottom: "10px" }}
            >
              Indeed's salary guide
            </Typography>
            <div className={classes.sub_details}>
              <li>Not provided by employer</li>
              <li>
                $ {salary} per year is Indeed's estimated salary for {jobTitle}{" "}
                at {companyName}.
              </li>
            </div>
          </Box>
          <hr />
          <Box style={{ marginBottom: "10px" }}>
            <Typography
              className={classes.job_title}
              style={{ marginBottom: "10px" }}
            >
              Full Job Description
            </Typography>
            <div className={classes.sub_details}>
              What You’ll Do: <br />
              <li>{jobDetails.yourRole}</li> <br />
              Why You’ll love working for a: <br />
              <li>{jobDetails.whyYouWillLoveWorking}</li> <br />
              Work Remotely <br />
              <li>Temporarily due to COVID-19</li> <br />
              Job type: {jobDetails.jobType}
              <br />
              Pay: {jobDetails.salaryDetails}
              <br />
            </div>
          </Box>
          {/* <Button className={classes.link} onClick={()=>handleOpen(jobkey)} disabled={applied_job[jobkey]?true:false}  style={{marginBottom:'30px'}}>
            {applied_job[jobkey]?'Applied':'Apply Now'}
        </Button> */}
          {/* <Section jobDescription={jobDescription} summary={snippet} />
        <ApplyModal 
                open={open}
                handleClose = {()=>handleClose()}
                jobId = {jobId}
                handleApply ={()=>handleApply()}
        /> */}
        </Box>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default JobDescription;
