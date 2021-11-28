import React, { useState, useEffect } from "react";
import { useStyles } from "./Styles";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import theme from "../../common/MenuTheme";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const FullName = (props) => {
  const userProfile = props.userProfile;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          margin: "15px",
          paddingRight: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "15px",
            paddingLeft: "20px",
            paddingRight: "20px",
            border: "3px solid #085ff7",
            borderRadius: "100%",
            marginRight: "25px",
          }}
        >
          <div
            className="first-letter"
            style={{
              display: "block",
              fontWeight: "900",
              fontSize: "1.375rem",
            }}
          >
            S
          </div>
          <div
            className="first-letter"
            style={{
              display: "block",
              fontWeight: "900",
              fontSize: "1.375rem",
            }}
          >
            S
          </div>
        </div>
        <Typography variant="h4" component="div" style={{ paddingTop: "10px" }}>
          {"Your Name" || userProfile.firstName}
        </Typography>
      </div>
    </div>
  );
};

// Upload Resume block
const Resume = (props) => {
  const classes = useStyles();
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Get Started
          </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="submit"
            className={classes.uploadResume}
          >
            <ListItemIcon>
              <CloudUploadIcon fontSize="medium" />
            </ListItemIcon>
            Upload a Resume
          </Button>
        </CardActions>
        <CardContent>
          <Typography variant="body2">
            By continuing, you agree to create a public resume and agree to
            receiving job opportunities from employers.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
// Contact Details Block
const ContactInformation = (props) => {
  const classes = useStyles();
  const [editProfile, setEditStatus] = useState(false);
  return (
    <>
      <Card variant="outlined">
        <CardContent className={classes.flexSpaceBetween}>
          <Typography variant="h5" component="div">
            Contact Information
          </Typography>
          <EditSharpIcon
            fontSize="medium"
            onClick={(e) => {
              e.preventDefault();
              setEditStatus(true);
            }}
          />
        </CardContent>
        {!editProfile ? (
          <CardContent>
            <Typography variant="body2">
              {localStorage.getItem("userEmailId")}
            </Typography>
          </CardContent>
        ) : (
          <div style={{ padding: "20px" }}>
            <Typography variant="body2">* Required Fields</Typography>
            <br />
            <form>
              <Typography style={{ marginTop: "10px" }} variant="body2">
                First Name
              </Typography>
              <TextField
                variant="outlined"
                label="First Name"
                style={{ width: "100%", marginTop: "10px" }}
                // onChange={(e) => {
                //   setCompanyName(e.target.value);
                // }}
                // value={companyName}
                required
              />
              <br />
              <Typography style={{ marginTop: "10px" }} variant="body2">
                Last Name
              </Typography>
              <TextField
                variant="outlined"
                label="Last Name"
                style={{ width: "100%", marginTop: "10px" }}
                // onChange={(e) => {
                //   setCompanyName(e.target.value);
                // }}
                // value={companyName}
                required
              />
              <br />
              <Typography style={{ marginTop: "10px" }} variant="body2">
                Email Address
              </Typography>
              <Typography
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                variant="body2"
              >
                {localStorage.getItem("userEmailId")}
              </Typography>
              <br />
              <Typography style={{ marginTop: "10px" }} variant="body2">
                Phone Number (Optional)
              </Typography>
              <TextField
                variant="outlined"
                style={{ width: "100%", marginTop: "10px" }}
                // onChange={(e) => {
                //   setCompanyName(e.target.value);
                // }}
                // value={companyName}
              />
              <br />
              <Button
                variant="contained"
                // type="submit"
                className={classes.saveButton}
                onClick={(e) => {
                  e.preventDefault();
                  setEditStatus(false);
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                className={classes.cancelButton}
                onClick={(e) => {
                  e.preventDefault();
                  setEditStatus(false);
                }}
              >
                Cancel
              </Button>
            </form>
          </div>
        )}
      </Card>
    </>
  );
};

const JobSeekerProfile = () => {
  const [userProfile, setProfile] = useState();

  useEffect(() => {}, []);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <hr />
      <FullName userProfile="" />
      <div
        className="profile-container"
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "15px",
        }}
      >
        <div className="profile">
          <Resume />
          <br />
          <ContactInformation />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default JobSeekerProfile;
