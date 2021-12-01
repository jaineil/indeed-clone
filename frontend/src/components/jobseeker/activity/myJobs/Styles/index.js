import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
