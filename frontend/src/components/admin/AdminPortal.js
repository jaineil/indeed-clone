import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink as HeaderNavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import AdminHeader from "./AdminHeader";
import { useStyles } from "./Styles";
import theme from "../common/MenuTheme";
import { Analytics } from "./components/Analytics";
import { Companies } from "./components/Companies";
import ReviewTab from "./ReviewTab";
import PhotoTab from "./PhotoTab";

export const AdminPortal = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("1");
  return (
    <>
      <ThemeProvider theme={theme}>
        <AdminHeader />
        <hr style={{ margin: "0" }} />
        <div>
          <Row style={{ margin: "0" }}>
            <Col
              xs={2}
              style={{
                padding: "0px",
                zIndex: "1",
                boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Nav vertical style={{ paddingTop: "10px" }}>
                <NavItem>
                  <HeaderNavLink
                    className={classnames(
                      { active: activeTab === "1" },
                      classes.pointer
                    )}
                    style={{
                      backgroundColor: "#fcfcfc",
                      color: "#007bff",
                      fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
                      padding: "20px",
                      zIndex: "1",
                      marginBottom: "5px",
                      textAlign: "center",
                      boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setActiveTab("1");
                    }}
                  >
                    <DashboardIcon
                      style={{
                        margin: "auto",
                        marginRight: "5px",
                      }}
                    />
                    <p
                      className="black b"
                      style={{
                        margin: "auto",
                        marginLeft: "5px",
                      }}
                    >
                      Dashboard
                    </p>
                  </HeaderNavLink>
                </NavItem>
                <NavItem className="black">
                  <HeaderNavLink
                    className={classnames(
                      { active: activeTab === "2" },
                      classes.pointer
                    )}
                    style={{
                      backgroundColor: "#fcfcfc",
                      color: "#007bff",
                      fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
                      padding: "20px",
                    }}
                    onClick={() => {
                      setActiveTab("2");
                    }}
                  >
                    <p
                      className="black b"
                      style={{
                        margin: "auto",
                        textAlign: "center",
                      }}
                    >
                      Companies
                    </p>
                  </HeaderNavLink>
                  <hr style={{ margin: "5px" }} />
                </NavItem>
                <NavItem className="black">
                  <HeaderNavLink
                    className={classnames(
                      { active: activeTab === "3" },
                      classes.pointer
                    )}
                    style={{
                      backgroundColor: "#fcfcfc",
                      color: "#007bff",
                      fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
                      padding: "20px",
                    }}
                    onClick={() => {
                      setActiveTab("3");
                    }}
                  >
                    <p
                      className="black b"
                      style={{
                        margin: "auto",
                        textAlign: "center",
                      }}
                    >
                      Review Requests
                    </p>
                  </HeaderNavLink>
                  <hr style={{ margin: "5px" }} />
                </NavItem>
                <NavItem className="black">
                  <HeaderNavLink
                    className={classnames(
                      { active: activeTab === "4" },
                      classes.pointer
                    )}
                    style={{
                      backgroundColor: "#fcfcfc",
                      color: "#007bff",
                      fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
                      padding: "20px",
                    }}
                    onClick={() => {
                      setActiveTab("4");
                    }}
                  >
                    <p
                      className="black b"
                      style={{
                        margin: "auto",
                        textAlign: "center",
                      }}
                    >
                      Photo Requests
                    </p>
                  </HeaderNavLink>
                  <hr style={{ margin: "5px" }} />
                </NavItem>
              </Nav>
            </Col>
            <Col className={classes.tabCol}>
              <TabContent className={classes.tabContent} activeTab={activeTab}>
                <TabPane tabId="1">
                  <Analytics />
                </TabPane>
                <TabPane tabId="2">
                  <Companies />
                </TabPane>
                <TabPane tabId="3">
                  {/* <Row className={classes.row}>
                    <Col className={classes.col}>
                      
                    </Col>
                  </Row> */}
                  <h3 style={{ color: "#05164d" }}>
                    <em>Reviews</em>
                  </h3>
                  <ReviewTab />
                </TabPane>
                <TabPane tabId="4">
                  {/* <Row className={classes.row}>
                    <Col className={classes.col}>
                      
                    </Col>
                  </Row> */}
                  <h3 style={{ color: "#05164d" }}>
                    <em>Photos</em>
                  </h3>
                  <PhotoTab />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      </ThemeProvider>
    </>
  );
};
