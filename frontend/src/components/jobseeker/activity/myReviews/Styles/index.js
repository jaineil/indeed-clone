import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  reviewsParent: {
    paddingLeft: "300px",
    paddingRight: "300px",
  },
  headerWrapper: {
    width: "600px",
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
  bottomBorder: {
    borderBottom: "1px solid #085ff7",
    marginBottom: "5px",
    paddingBottom: "10px",
  },
}));
