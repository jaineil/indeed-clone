import React, { useReducer, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import { Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink as HeaderNavLink,
	Row,
	Col,
	Container,
} from "reactstrap";
import { Card } from "react-bootstrap";
import classnames from "classnames";
import { Link, NavLink } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useStyles } from "./Styles";
import theme from "../common/MenuTheme";
import endPointObj from "../../endPointUrl";
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
								height: "100vh",
								padding: "0px",
								zIndex: "1",
								boxShadow: "0 6px 20px 0 rgba(0, 0, 1, 0.19)",
							}}
						>
							<Nav vertical style={{ paddingTop: "10px" }}>
								<NavItem>
									<HeaderNavLink
										className={classnames(
											{ active: activeTab === "1" },
											classes.pointer
										)}
										style={{ backgroundColor: "#fcfcfc" }}
										onClick={() => {
											setActiveTab("1");
										}}
									>
										<p className="black b">Dashboard</p>
									</HeaderNavLink>
									<hr style={{ margin: "5px" }} />
								</NavItem>
								<NavItem className="black">
									<HeaderNavLink
										className={classnames(
											{ active: activeTab === "2" },
											classes.pointer
										)}
										style={{ backgroundColor: "#fcfcfc" }}
										onClick={() => {
											setActiveTab("2");
										}}
									>
										<p className="black b">Companies</p>
									</HeaderNavLink>
									<hr style={{ margin: "5px" }} />
								</NavItem>
								<NavItem className="black">
									<HeaderNavLink
										className={classnames(
											{ active: activeTab === "3" },
											classes.pointer
										)}
										style={{ backgroundColor: "#fcfcfc" }}
										onClick={() => {
											setActiveTab("3");
										}}
									>
										<p className="black b">
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
										style={{ backgroundColor: "#fcfcfc" }}
										onClick={() => {
											setActiveTab("4");
										}}
									>
										<p className="black b">
											Photo Requests
										</p>
									</HeaderNavLink>
									<hr style={{ margin: "5px" }} />
								</NavItem>
							</Nav>
						</Col>
						<Col className={classes.tabCol}>
							<TabContent
								className={classes.tabContent}
								activeTab={activeTab}
							>
								<TabPane tabId="1">Dashboard</TabPane>
								<TabPane tabId="2">
									<Row className={classes.row}>
										<Col className={classes.col}>
											Companies
										</Col>
									</Row>
								</TabPane>
								<TabPane tabId="3">
									<Row className={classes.row}>
										<Col className={classes.col}>
											Reviews
										</Col>
									</Row>
									<ReviewTab />
								</TabPane>
								<TabPane tabId="4">
									<Row className={classes.row}>
										<Col className={classes.col}>
											Photos
										</Col>
									</Row>
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
