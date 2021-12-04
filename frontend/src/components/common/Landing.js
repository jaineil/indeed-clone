import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import SearchJobForm from "../jobseeker/Landing/SearchJobForm";
import RecentJobSearch from "../jobseeker/Landing/RecentJobSearch";
import Header from "./Header";
import { ThemeProvider, Grid } from "@material-ui/core";
import theme from "./MenuTheme";
import { useDispatch, useSelector } from "react-redux";
import RedirectUnauthorized from "../jobseeker/RedirectUnauthorized";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "0px 10vw",
		marginTop: "70px",
	},
	linkContainer: {
		textAlign: "center",
		marginTop: "30px",
	},
	link: {
		fontWeight: "bolder",
		color: "#2557a7",
		fontSize: "1rem",
	},
	loginLink: {
		marginLeft: "1300px",
		fontWeight: "bolder",
		color: "#rgb(37, 87, 167)",
		fontSize: "20px",
	},
}));

function Landing() {
	const styleClasses = useStyles();
	const { isAuth, user } = useSelector((state) => state.login);
	console.log("isauth home", isAuth);
	console.log("Login user data: home", user);
	return (
		<ThemeProvider theme={theme}>
			<hr />
			<Grid className={styleClasses.loginLink}>
				<Link to="/login" style={{ color: "#2557a7" }}>
					login/
				</Link>
				<Link to="/register" style={{ color: "#2557a7" }}>
					register
				</Link>
			</Grid>
			<Container className={styleClasses.container}>
				<SearchJobForm />
				<div className={styleClasses.linkContainer}>
					<Link to="/login" className={styleClasses.link}>
						{` Post your resume `}
					</Link>
					{`It only takes a few seconds`} <br />
					<br />
					{`Employers:`}
					<Link to="/login" className={styleClasses.link}>
						{` Post a job `}
					</Link>
				</div>
			</Container>
			<hr />
		</ThemeProvider>
	);
}

export default Landing;
