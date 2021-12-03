import React, { useEffect, useState, useReducer } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchJobForm from "../Landing/SearchJobForm";
import {
	getJobSearchData,
	// searchSuccess,
	// setCurrentPage,
} from "../../../_actions/jobSearchActions";
import JobDescription from "./JobDescription";
//import {timeDifference} from '../../Utils/timeDifference'
import JobMenu from "./JobMenu";
import Header from "../../common/Header";
import theme from "../../common/MenuTheme";
import { ThemeProvider } from "@material-ui/core";
import JwPagination from "jw-react-pagination";
import { saveJob } from "../../../_actions/saveJobAction";

const useStyles = makeStyles((theme) => ({
	jobContainer: {
		width: "450px",
		height: "400px",
	},
	card: {
		border: "1px solid black",
		padding: "15px",
		cursor: "pointer",
		position: "relative",
		height: "300px",
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
		//padding: "0 8vw",
		position: "relative",
	},
	sort_container: {
		display: "flex",
		justifyContent: "space-between",
		width: "450px",
		fontSize: "14px",
		margin: "10px 0px",
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
	const query = new URLSearchParams(props.location.search);

	const classes = useStyles();

	let job = query.get("q") || "";
	let location = query.get("location") || "";

	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	let jobs = useSelector((state) => state.search.searchedJobs);
	console.log("jobs", jobs);
	let totalCount = useSelector((state) => state.search.totalCount);
	const { isAuth } = useSelector((state) => state.login);
	let isLoading = useSelector((state) => state.search.isLoading);
	let userId = localStorage.getItem("userId");
	console.log("Inside display jobs: searchedJobs", jobs);
	console.log("Inside display jobs: searchcount", totalCount);

	const pageNo = query.get("page");
	let [page, setPage] = useState(Number(pageNo));
	let [pageOfItems, setPageOfItems] = useState([]);

	let [jobData, setJobData] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getJobSearchData(job, location, page));
		forceUpdate();
	}, [job, location, page]);

	const getJobDescription = (job) => {
		setJobData(job);
	};
	const mongoId = useSelector((state) => state.login.user.mongoId);
	//Need to work on it
	const handleSave = ({ jobId, city, companyName, jobTitle, companyId }) => {
		console.log(
			"Inside handle save job",
			jobId,
			city,
			companyName,
			jobTitle
		);
		localStorage.setItem("saveJobByUserId", jobId);

		const payload = {
			jobSeekerId: mongoId,
			jobId: jobId,
			jobTitle,
			companyId,
			companyName,
		};
		dispatch(saveJob(payload));
	};

	// const removeFromSaved = ({jobId})=>{
	//     const {id,saved_jobs} = loggedUser
	//     delete saved_jobs[jobId]
	//     //dispatch(makeSaveJobRequest({user_id:id,saved_jobs}))
	// }
	console.log("isAuth", isAuth);
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
			<Container className={classes.job_section}>
				<SearchJobForm /> <br />
				{isLoading ? (
					<></>
				) : jobs ? (
					<>
						<Box className={classes.greyText}>
							<b>Jobs in {location}</b>
						</Box>
						{ignored ? null : null}

						<Box style={{ display: "flex", height: "1600px" }}>
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
												{job.companyName}
											</Typography>
											<Typography
												className={classes.job_subTitle}
											>
												{job.city}, {job.state}
											</Typography>
											<Typography
												className={classes.job_subTitle}
											>
												$ {job.salary}
											</Typography>
											<div
												className={classes.job_snippet}
												style={{ color: "#6f6f6f" }}
											>
												{job.jobDescription}
											</div>
										</Box>
										<JobMenu
											job={job}
											handleSave={(e) => {
												e.preventDefault();
												handleSave();
											}}
											//removeFromSaved={removeFromSaved}
										/>
									</Grid>
								))}
							</Grid>{" "}
							&nbsp;&nbsp;&nbsp;
							<Grid>
								{jobData ? (
									<JobDescription
										jobData={jobData}
										summary={job.jobDescription}
									/>
								) : (
									<></>
								)}
							</Grid>
						</Box>
						<Grid>
							<JwPagination
								pageSize={5}
								items={jobs}
								onChangePage={setPageOfItems}
							/>
						</Grid>
					</>
				) : (
					<Box>No results found</Box>
				)}
			</Container>
		</ThemeProvider>
	);
}

export default DisplayJobs;
