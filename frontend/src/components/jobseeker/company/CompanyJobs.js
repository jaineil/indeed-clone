import React, { useEffect, useState, useReducer } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchJobTabForm from "./SearchJobTabForm";
import { getJobTabData } from "../../../_actions/jobSearchActions";
import JobDescription from "../jobs/JobDescription";
import JobMenu from "../jobs/JobMenu";
import Header from "../../common/Header";
import theme from "../../common/MenuTheme";
import { ThemeProvider } from "@material-ui/core";
import JwPagination from "jw-react-pagination";
import CompanyHeader from "./CompanyHeader";
import axios from "axios";
import endPointObj from "../../../endPointUrl";
import { Redirect, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	jobContainer: {
		width: "800px",
	},
	card: {
		border: "1px solid black",
		padding: "15px",
		cursor: "pointer",
		position: "relative",
		height: "100px",
		marginBottom: "20px",
		"&:hover": {
			"& $job_title": {
				textDecoration: "underline",
			},
		},
		borderRadius: "10px",
	},
	job_title: {
		fontWeight: "bold",
		fontSize: "20px",
	},
	job_subTitle: {
		fontSize: "16px",
	},
	job_snippet: {
		margin: "20px 0px 10px 0px",
		fontSize: "15px",
		lineHeight: "1.4rem",
	},
	greyText: {
		fontSize: "16px",
		color: "grey",
	},
	job_section: {
		//padding: '0 8vw',
		position: "relative",
	},
	sortStyle: {
		color: theme.palette.primary.main,
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline",
		},
	},
	bold: {
		fontWeight: "bolder",
		cursor: "pointer",
	},
}));

function DisplayJobs(props) {
	const location1 = useLocation();
	let companyId = "";
	let companyName = "";
	if (location1.state) {
		companyId = location1.state.companyId;
		companyName = location1.state.companyName;
		if (companyId) {
			localStorage.setItem("currentcompanyid", companyId);
			localStorage.setItem("currentcompanyname", companyName);
		}
	} else {
		companyId = localStorage.getItem("currentcompanyid");
		companyName = localStorage.getItem("currentcompanyname");
	}
	const query = new URLSearchParams(props.location.search);
	const { isAuth } = useSelector((state) => state.login);
	const classes = useStyles();

	let job = query.get("q") || "";
	let location = query.get("location") || "";

	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
	//const [companyId, setCompanyId] = useState();
	// const [location, setLocation] = useState();

	let jobs = useSelector((state) => state.search.searchedJobs);
	let totalCount = useSelector((state) => state.search.totalCount);
	const loggedUser = useSelector((state) => state.login.loggedUser);
	let isLoading = useSelector((state) => state.search.isLoading);
	let userId = localStorage.getItem("userId");
	console.log("Inside display jobs: searchedJobs", jobs);
	console.log("Inside display jobs: searchcount", totalCount);

	const pageNo = query.get("page");
	let [page, setPage] = useState(Number(pageNo));
	let [pageOfItems, setPageOfItems] = useState([]);

	let [jobData, setJobData] = useState([]);
	const dispatch = useDispatch();

	//const companyId = localStorage.getItem("currentcompanyid");
	console.log("hii company id", companyId);
	// const fetchAllJobsForCompany = async () => {
	// 	try {
	// 		console.log("Stuff ", companyId, job, location);
	// 		const res = await axios.get(
	// 			endPointObj.url + "/job-seeker/get-jobs-for-company",
	// 			{
	// 				params: {
	// 					companyId: companyId,
	// 					jobTitle: job,
	// 					location: location,
	// 				},
	// 			}
	// 		);
	// 		console.log("Company jobs => ", res.data.response);
	// 		setJobData(res.data.response);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
	useEffect(() => {
		//fetchAllJobsForCompany();
		dispatch(getJobTabData(job, location, companyId));
		forceUpdate();
	}, [job, location, companyId]);
	console.log("2:Inside display jobs: searchedJobs", jobs);

	const getJobDescription = (job) => {
		console.log("Hello");
		setJobData(job);
		console.log("bye", jobData);
	};

	return (
		<ThemeProvider theme={theme}>
			{isAuth ? (
				<Header />
			) : (
				<>
					<br />
					<br />
				</>
			)}
			<br />
			<CompanyHeader /> <br />
			<br />
			<Container className={classes.job_section}>
				<SearchJobTabForm /> <br />
				{isLoading ? (
					<></>
				) : jobs ? (
					<>
						{ignored ? null : null}

						<Box style={{ display: "flex", height: "600px" }}>
							<Grid className={classes.jobContainer} container>
								{pageOfItems.map((job, index) => (
									<Grid
										className={classes.card}
										item
										key={job.jobId}
										lg={12}
										md={12}
										sm={12}
										xs={12}
									>
										<Box
											onClick={() =>
												getJobDescription(job)
											}
										>
											<Typography
												className={classes.job_title}
											>
												{job.jobTitle}
											</Typography>
											<Typography
												className={classes.job_subTitle}
											>
												{job.location.city},
												{job.location.state}
											</Typography>
											<Typography
												className={classes.job_subTitle}
											>
												{" "}
												{job.daysPosted} days ago
											</Typography>
										</Box>
									</Grid>
								))}
							</Grid>
							<Grid>
								{jobData ? (
									<JobDescription jobData={jobData} />
								) : (
									<></>
								)}
							</Grid>
						</Box>

						<JwPagination
							pageSize={5}
							items={jobs}
							onChangePage={setPageOfItems}
						/>
					</>
				) : (
					<Box>No results found</Box>
				)}
			</Container>
		</ThemeProvider>
	);
}

export default DisplayJobs;
