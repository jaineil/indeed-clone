import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Grid, Container, makeStyles, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
//import companyDetails from './companyDetails';
import CompanyHeader from "./CompanyHeader";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import endPointObj from "../../../endPointUrl.js";
import { FeatureReviewCard } from "./FeatureReviewCard";
import { useLocation } from "react-router";

const useStyle = makeStyles((theme) => ({
	imgCont: {
		padding: "5px",
		borderRadius: "5px",
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	},
	optionTab: {
		cursor: "pointer",
		margin: "0 40px 0 40px",
		fontWeight: "bold",
	},
	scoreTest: {
		margin: 0,
		backgroundColor: "#f3f2f1",
		fontSize: "1.25rem",
		fontWeight: "700",
		color: "#2d2d2d",
		borderRadius: "0.5rem",
		lineHeight: "1.5",
		padding: "0.35rem 0.75rem",
	},
}));

export function CompanyHome(props) {
	const location = useLocation();
	const classes = useStyle();
	const query = new URLSearchParams(props.location.search);
	const id = query.get("id");
	const [companyDetails, setCompany] = useState([]);
	const [topFeaturedReview, setFeaturedReview] = useState([]);
	let companyId = "";
	let companyName = "";
	if (location.state) {
		companyId = location.state.companyId;
		companyName = location.state.companyName;
		if (companyId) {
			localStorage.setItem("currentcompanyid", companyId);
			localStorage.setItem("currentcompanyname", companyName);
		}
	} else {
		companyId = localStorage.getItem("currentcompanyid");
		companyName = localStorage.getItem("currentcompanyname");
	}

	useEffect(() => {
		axios
			.get(`${endPointObj.url}/job-seeker/company-home/${companyId}`)
			.then((response) => {
				console.log(
					"Get company details response",
					response.data.response
				);
				setCompany(response.data.response);
				let topFeaturedReview = [];
				if (response.data.response.featuredReviews.length > 0) {
					for (var i = 0; i < 5; i++) {
						if (response.data.response.featuredReviews[i]) {
							topFeaturedReview.push(
								response.data.response.featuredReviews[i]
							);
						}
					}
				}
				setFeaturedReview(topFeaturedReview);
			})
			.catch((err) => {
				if (err.response && err.response.data) {
					console.log("Error", err.response);
				}
			});
	}, []);

	console.log(topFeaturedReview);

	//fetch company id by localstorage

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<hr />
			<CompanyHeader />
			<hr />
			<Container maxwidth="xl">
				{/* Work happiness */}
				<Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
					<Typography variant="h5">
						<b>Work happiness</b>
					</Typography>
				</Grid>

				<Grid
					container
					style={{
						height: "40px",
						paddingLeft: "250px",
						marginBottom: "130px",
					}}
				>
					<Grid
						item
						className={classes.optionTab}
						style={{ height: "20px", width: "60px" }}
					>
						<div className={classes.scoreTest}>
							{companyDetails.avgWorkHappinessScore}
						</div>{" "}
						<br />
						<div
							style={{
								height: "20px",
								width: "160px",
								fontSize: "20px",
							}}
						>
							Work Happiness Score{" "}
						</div>
					</Grid>
					<Grid
						item
						className={classes.optionTab}
						style={{
							height: "20px",
							width: "60px",
							marginLeft: "100px",
						}}
					>
						<div className={classes.scoreTest}>
							{companyDetails.avgLearningScore}
						</div>{" "}
						<br />
						<div
							style={{
								height: "20px",
								width: "160px",
								fontSize: "20px",
							}}
						>
							Learning
						</div>
					</Grid>
					<Grid
						item
						className={classes.optionTab}
						style={{
							height: "20px",
							width: "60px",
							marginLeft: "100px",
						}}
					>
						<div className={classes.scoreTest}>
							{companyDetails.avgAppreciationScore}
						</div>{" "}
						<br />
						<div
							style={{
								height: "20px",
								width: "160px",
								fontSize: "20px",
							}}
						>
							Appreciation
						</div>
					</Grid>
				</Grid>

				{/* About the Company */}
				<Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
					<Typography variant="h5">
						<b>About the company</b>
					</Typography>

					<Grid
						item
						style={{ marginTop: "20px", marginBottom: "50px" }}
					>
						<Typography>
							<p>{companyDetails.aboutTheCompany}</p>
						</Typography>
					</Grid>

					<Grid
						container
						style={{
							height: "40px",
							paddingRight: "100px",
							marginBottom: "380px",
						}}
						spacing={1}
					>
						<table>
							<tr>
								<td>
									<Grid
										item
										style={{
											border: "2px solid #f2f2f2",
											borderRadius: "10px",
											padding: "40px",
											marginLeft: "200px",
										}}
									>
										<div style={{ fontWeight: "600" }}>
											<h5> CEO </h5>
										</div>
										<div>{companyDetails.ceo}</div>
									</Grid>
								</td>
								<td>
									<Grid
										item
										style={{
											border: "2px solid #f2f2f2",
											borderRadius: "10px",
											padding: "40px",
											marginLeft: "200px",
										}}
									>
										<div style={{ fontWeight: "600" }}>
											<h5> Founded </h5>
										</div>
										<div>{companyDetails.founded}</div>
									</Grid>
								</td>
								<td>
									<Grid
										item
										style={{
											border: "2px solid #f2f2f2",
											borderRadius: "10px",
											padding: "40px",
											marginLeft: "200px",
										}}
									>
										<div style={{ fontWeight: "600" }}>
											<h5> Revenue </h5>
										</div>
										<div>{companyDetails.revenue}</div>
									</Grid>
								</td>
							</tr>
							<br />
							<br />
							<br />
							<tr>
								<td>
									<Grid
										item
										style={{
											border: "2px solid #f2f2f2",
											borderRadius: "10px",
											padding: "40px",
											marginLeft: "200px",
										}}
									>
										<div style={{ fontWeight: "600" }}>
											<h5> Industry </h5>
										</div>
										<div>{companyDetails.industry}</div>
									</Grid>
								</td>
								<td>
									<Grid
										item
										style={{
											border: "2px solid #f2f2f2",
											borderRadius: "10px",
											padding: "40px",
											marginLeft: "200px",
										}}
									>
										<div style={{ fontWeight: "600" }}>
											<h5> Company Size </h5>
										</div>
										<div>{companyDetails.companySize}</div>
									</Grid>
								</td>
							</tr>
						</table>
					</Grid>
				</Grid>

				<Grid item style={{ marginTop: "20px", marginBottom: "40px" }}>
					<Typography variant="h5">
						<b>Company Description</b>
					</Typography>
				</Grid>

				<Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
					<Typography>
						<p>{companyDetails.companyDescription}</p>
					</Typography>
				</Grid>

				<Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
					<Typography variant="h5">
						<b>Company Mission</b>
					</Typography>
				</Grid>

				<Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
					<Typography>
						<p>{companyDetails.companyMission}</p>
					</Typography>
				</Grid>

				<Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
					<Typography variant="h5">
						{topFeaturedReview.length ? <b>Reviews</b> : <></>}
					</Typography>
				</Grid>

				<Grid
					container
					spacing={10}
					style={{
						marginTop: "30px",
						marginBottom: "50px",
						marginLeft: "210px",
					}}
				>
					{console.log("Top featured review: ", topFeaturedReview)}
					{topFeaturedReview.length ? (
						topFeaturedReview.map((item) => {
							return (
								<FeatureReviewCard
									reviewTitle={item.reviewTitle}
									city={item.city}
									state={item.state}
									postedDate={item.postedDate}
									overallStars={item.overallStars}
									ratingInNumber={item.ratingInNumber}
								/>
							);
						})
					) : (
						<></>
					)}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}
export default CompanyHome;
