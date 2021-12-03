import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../src/components/common/MenuTheme";
import Main from "./Main.js";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // //To extract isAuth data from redux store
  // //const isAuth = useSelector((state) => state.login.isAuth);
  // window.onbeforeunload = function () {
  // 	localStorage.clear();
  // };
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
