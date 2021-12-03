import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStyles } from "./Styles";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import theme from "../../common/MenuTheme";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../../_actions/jobseekerActions";
import {
  firstNameSelector,
  lastNameSelector,
  contactNumberSelector,
  resumesSelector,
  citySelector,
  stateSelector,
} from "../../../_reducers/jobseekerReducer";
import endPointObj from "../../../endPointUrl";

// Full Name Header
const FullName = () => {
  const firstName = useSelector(firstNameSelector);
  const lastName = useSelector(lastNameSelector);
  const fullName = firstName + " " + lastName;
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
            {firstName?.slice(0, 1) || "Y"}
          </div>
          <div
            className="first-letter"
            style={{
              display: "block",
              fontWeight: "900",
              fontSize: "1.375rem",
            }}
          >
            {lastName?.slice(0, 1) || "N"}
          </div>
        </div>
        <Typography variant="h4" component="div" style={{ paddingTop: "10px" }}>
          {fullName !== " " ? fullName : "Your Name"}
        </Typography>
      </div>
    </div>
  );
};

// Upload Resume block
const Resume = ({ mongoId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const resumes = useSelector(resumesSelector);

  const hiddenFileInput = React.useRef(null);
  const uploadResume = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    e.preventDefault();
    const fileUploaded = e.target.files[0];
    const formData = new FormData();
    formData.append("file", fileUploaded);
    axios
      .post(
        `${endPointObj.url}/job-seeker/upload-resume?jobSeekerId=${mongoId}&resumeName=${fileUploaded.name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) dispatch(getProfile(mongoId));
      })
      .catch((err) => {
        console.log("Error while uploading Resume: ", err);
      });
  };

  const deleteResume = (e) => {
    e.preventDefault();
    const body = {
      jobSeekerId: mongoId,
      resumeId: resumes[resumes.length - 1]._id,
      resumeName: resumes[resumes.length - 1].name,
    };
    console.log(body);
    axios
      .put(`${endPointObj.url}/job-seeker/delete-resume`, body)
      .then((res) => {
        if (res.status === 200) dispatch(getProfile(mongoId));
      })
      .catch((err) => {
        console.log("Error while uploading Resume: ", err);
      });
  };

  return (
    <>
      <Card variant="outlined" style={{ width: "600px" }}>
        {resumes.length === 0 ? (
          <>
            <CardContent>
              <Typography
                variant="body1"
                component="div"
                style={{ fontSize: "1.375rem", fontWeight: "bold" }}
              >
                Get Started
              </Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                className={classes.uploadResume}
                onClick={uploadResume}
              >
                <ListItemIcon>
                  <CloudUploadIcon fontSize="medium" />
                </ListItemIcon>
                Upload a Resume
              </Button>
              <input
                type="file"
                id="resume"
                name="resume"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={handleChange}
              />
            </CardActions>
            <CardContent>
              <Typography variant="body2">
                By continuing, you agree to create a public resume and agree to
                receiving job opportunities from employers.
              </Typography>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent>
              <Typography
                variant="body1"
                component="div"
                style={{ fontSize: "1.375rem", fontWeight: "bold" }}
              >
                Resume
              </Typography>
              <Typography
                variant="body1"
                component="a"
                href={resumes[resumes.length - 1].url}
                target="_blank"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {resumes[resumes.length - 1].name}
              </Typography>
            </CardContent>

            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="button"
                onClick={uploadResume}
                className={classes.uploadResume}
              >
                Replace
              </Button>
              <input
                type="file"
                id="resume"
                name="resume"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                type="button"
                className={classes.deleteResume}
                onClick={deleteResume}
              >
                Delete
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </>
  );
};

// Contact Details Block
const ContactInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const jobseekerId = useSelector((state) => state.jobseekerProfile._id);

  const [editProfile, setEditStatus] = useState(false);
  const userFName = useSelector(firstNameSelector);
  const userLName = useSelector(lastNameSelector);
  const [firstName, setFirstName] = useState(userFName);
  const [lastName, setLastName] = useState(userLName);
  const [contactNumber, setContactNumber] = useState(
    useSelector(contactNumberSelector)
  );
  const [city, setCity] = useState(useSelector(citySelector));
  const [state, setState] = useState(useSelector(stateSelector));

  const handleSumbit = (e) => {
    e.preventDefault();
    const payload = {
      jobseekerId,
      firstName,
      lastName,
      contactNumber,
      city,
      state,
    };
    dispatch(updateProfile(payload));
    setEditStatus(false);
  };
  return (
    <>
      <Card variant="outlined">
        <CardContent
          className={classes.flexSpaceBetween}
          style={{ paddingBottom: "0", marginBottom: "0px" }}
        >
          <Typography
            variant="body1"
            component="div"
            style={{ fontSize: "1.375rem", fontWeight: "bold" }}
          >
            Contact Information
          </Typography>
          {!editProfile ? (
            <EditSharpIcon
              fontSize="medium"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                setEditStatus(true);
              }}
            />
          ) : (
            <div></div>
          )}
        </CardContent>
        {!editProfile ? (
          <CardContent>
            {firstName !== "" && lastName !== "" ? (
              <>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  {firstName + " " + lastName}
                </Typography>
              </>
            ) : (
              <div></div>
            )}
            <Typography variant="body2" style={{ marginBottom: "10px" }}>
              {localStorage.getItem("userEmailId")}
            </Typography>
            {contactNumber !== "" ? (
              <>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  {contactNumber}
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                className={classes.addPhoneNumber}
                onClick={(e) => {
                  e.preventDefault();
                  setEditStatus(true);
                }}
              >
                Add phone number
              </Typography>
            )}
          </CardContent>
        ) : (
          <div style={{ padding: "20px" }}>
            <Typography variant="body2">* Required Fields</Typography>
            <br />
            <form onSubmit={handleSumbit}>
              <TextField
                variant="outlined"
                label="First Name"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => {
                  e.preventDefault();
                  setFirstName(e.target.value);
                }}
                value={firstName}
                required
              />
              <br />
              <TextField
                variant="outlined"
                label="Last Name"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => {
                  e.preventDefault();
                  setLastName(e.target.value);
                }}
                value={lastName}
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
              <TextField
                variant="outlined"
                label="Phone Number (Optional)"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => {
                  e.preventDefault();
                  setContactNumber(e.target.value);
                }}
                value={contactNumber}
              />
              <br />
              <Typography
                style={{ marginTop: "10px", fontWeight: "bold" }}
                variant="body2"
              >
                Location
              </Typography>
              <TextField
                variant="outlined"
                label="City (Optional)"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => {
                  e.preventDefault();
                  setCity(e.target.value);
                }}
                value={city}
              />
              <TextField
                variant="outlined"
                label="State (Optional)"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => {
                  e.preventDefault();
                  setState(e.target.value);
                }}
                value={state}
              />
              <Button type="submit" className={classes.saveButton}>
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
  const dispatch = useDispatch();
  const mongoId = useSelector((state) => state.login.user.mongoId);
  useEffect(() => {
    dispatch(getProfile(mongoId), []);
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <hr />
      <FullName />
      <div
        className="profile-container"
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "15px",
        }}
      >
        <div className="profile">
          <Resume mongoId={mongoId} />
          <br />
          <ContactInformation />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default JobSeekerProfile;
