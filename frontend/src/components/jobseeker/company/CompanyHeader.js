import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";
import { Grid, Container, makeStyles, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import endPointObj from "../../../endPointUrl.js";

const useStyle = makeStyles((theme) => ({
	imgCont: {
		borderRadius: "5px",
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	},
	optionTab: {
		cursor: "pointer",
		margin: "0 40px 0 40px",
		color: "#000000",
		textDecoration: "none",
		"&:hover": {
			borderBottom: "5px solid #000000",
			fontWeight: "bold",
			color: "#000000",
		},
		"a.focus": {
			borderBottom: "5px solid #000000",
			fontWeight: "bold",
			color: "#000000",
		},
	},
}));

export default function CompanyHeader(props) {
	const [companyDetails, setCompany] = useState([]);
	const classes = useStyle();
	const { isAuth } = useSelector((state) => state.login);
	const companyId = localStorage.getItem("currentcompanyid");
	const companyName = localStorage.getItem("currentcompanyname");

	const getCompanyDetails = async () => {
		try {
			const response = await axios.get(
				`${endPointObj.url}/job-seeker/company-home/${companyId}`
			);
			console.log("Get company details response", response.data.response);
			setCompany(response.data.response);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getCompanyDetails();
	}, []);

	return isAuth ? (
		companyDetails ? (
			<Container maxwidth="xl">
				<Grid
					container
					style={{
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "40px",
					}}
				>
					<Grid container item lg={6} md={7} sm={8}>
						<Grid item className={classes.imgCont}>
							{/* Need to add company image */}
							<img
								src="https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg"
								alt="Company home page"
								width="1200px"
								height="400px"
							/>
						</Grid>
						<Grid
							item
							style={{ paddingTop: "50px", paddingLeft: "50px" }}
						>
							<Typography variant="h4">{companyName}</Typography>
							<Typography variant="h6">
								{/* {companyDetails.featuredReviews[0].overallStars}  */}
								<StarIcon
									style={{
										color: "#9d2b6b",
										paddingRight: "10px",
									}}
								/>
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					container
					style={{ height: "40px", paddingLeft: "200px" }}
				>
					<Grid
						item
						className={classes.optionTab}
						style={{ textDecoration: "none" }}
						component={Link}
						to="/companyhome"
					>
						SnapShot
					</Grid>
					<Grid
						item
						className={classes.optionTab}
						style={{ textDecoration: "none" }}
						component={Link}
						to="/joinus"
					>
						Why Join Us
					</Grid>
					<Grid
						item
						className={classes.optionTab}
						style={{ textDecoration: "none" }}
						component={Link}
						to="/companyreview"
					>
						Reviews
					</Grid>
					<Grid
						item
						className={classes.optionTab}
						style={{ textDecoration: "none" }}
						component={Link}
						to="/companysalary"
					>
						Salaries
					</Grid>
					<Grid
						item
						className={classes.optionTab}
						style={{ textDecoration: "none" }}
						component={Link}
						to="/companyphotos"
					>
						Photos
					</Grid>
					<Grid
						item
						className={classes.optionTab}
						style={{ textDecoration: "none" }}
						component={Link}
						to="/companyjobs"
					>
						Jobs
					</Grid>
				</Grid>
			</Container>
		) : (
			<></>
		)
	) : (
		<Redirect to="/login" />
	);
}
