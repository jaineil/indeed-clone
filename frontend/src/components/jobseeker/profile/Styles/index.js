import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  uploadResume: {
    borderRadius: "30px",
    padding: "10px",
    boxShadow: "none",
    border: "3px solid #085ff7",
    width: "50%",
    backgroundColor: "#ffffff",
    color: "#2557a7",
    fontStyle: "Open Sans",
    fontWeight: "bold",
    height: "150%",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  deleteResume: {
    borderRadius: "30px",
    padding: "10px",
    boxShadow: "none",
    border: "3px solid red",
    width: "50%",
    backgroundColor: "#ffffff",
    color: "red",
    fontStyle: "Open Sans",
    fontWeight: "bold",
    height: "150%",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  saveButton: {
    borderRadius: "30px",
    boxShadow: "none",
    margin: "15px",
    backgroundColor: "#2557a7",
    color: "#ffffff",
    fontStyle: "Open Sans",
    fontWeight: "bold",
    height: "150%",
    "&:hover": {
      backgroundColor: "#103a7d",
    },
  },
  cancelButton: {
    boxShadow: "none",
    margin: "15px",
    backgroundColor: "#ffffff",
    color: "#2557a7",
    fontStyle: "Open Sans",
    fontWeight: "bold",
    height: "150%",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
      color: "#103a7d",
    },
  },
  addPhoneNumber: {
    color: "#595959",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
