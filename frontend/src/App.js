import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../src/components/common/MenuTheme";
import Main from "./Main.js";
import Header from "./components/common/Header";
import { useSelector } from "react-redux";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // window.onbeforeunload = function() {
  //   localStorage.clear();
  // }
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
