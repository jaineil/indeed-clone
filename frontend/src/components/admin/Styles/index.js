import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: "pointer",
  },
  tabContent: {
    paddingTop: "10px",
    paddingLeft: "25px",
    paddingRight: "15px",
    minHeight: "90vh",
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
  row: {
    margin: "0",
  },
  col: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  menuItem: {
    borderBottom: "1px solid grey",
  },
  tabCol: {
    paddingLeft: "0px",
    paddingRight: "0px",
    background: "#ebeef2",
  },
}));
