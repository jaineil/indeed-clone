import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import endPointObj from "../../../endPointUrl.js";
import {
	Grid,
	Container,
	makeStyles,
	Typography,
	Button,
	Box,
} from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import companyDetails from "../company/companyDetails";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import companydetails from "../company/companyDetails";
import { CompanyReviewCard } from "./CompanyReviewCard.js";
import SearchCompaniesForm from "./SearchCompaniesForm.js";
import SearchJobsForm from "../Landing/SearchJobForm.js";

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
	link: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "10px",
		height: "53px",
		padding: "0 25px",
		fontSize: "15px",
		color: theme.palette.primary.main,
		border: `1px solid ${theme.palette.primary.main}`,
		backgroundColor: "white",
		"&:hover": {
			color: theme.palette.primary.main,
			backgroundColor: "white",
			border: `1px solid ${theme.palette.primary.main}`,
		},
	},
}));

export function CompanyReview(props) {
	const query = new URLSearchParams(props.location.search);
	console.log(query);
	let job = query.get("query") || "";
	let location = query.get("location") || "";
	const classes = useStyle();
	const [companyReviewDetails, setCompanyReviewDetails] = useState([]);
	const { isAuth } = useSelector((state) => state.login);
	const companyId = localStorage.getItem("currentcompanyid");
	const [open, setOpen] = useState(false);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
	console.log("PROPS: ", props);
	console.log(job, location);

	const searchForCompanies = async (req, res) => {
		console.log("Searching for companies");
		try {
			const response = await axios.get(
				`${endPointObj.url}/job-seeker/search-for-companies?companyName=${job}&location=${location}`
			);
			console.log(response);
			setCompanyReviewDetails(response.data.response);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		console.log("USE EFFECT");
		console.log("Inside get Company Reviews");
		console.log(job, location);
		if (job || location) {
			searchForCompanies();
		} else {
			axios
				.get(endPointObj.url + "/admin/get-companies")
				.then((response) => {
					console.log(
						"Get company reviews on landing page response",
						response.data
					);
					let r = [];
					for (let i = 0; i < response.data.length; i++) {
						r.push({
							...response.data[i],
							companyId: response.data[i]._id,
						});
					}
					setCompanyReviewDetails(r);
				})
				.catch((err) => {
					if (err.response && err.response.data) {
						console.log("Error", err.response);
					}
				});
		}
	}, [job, location]);

	//fetch company id by localstorage
	//Call fetch company details API
	console.log("Salary  details: ", companyReviewDetails);

	const handleOpen = (id) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleApply = () => {
		setOpen(false);
		forceUpdate();
	};

	// var companyReviewDetails= [
	//     {
	//         "companyId": "1",
	//         "companyName": "Amazon",
	//         "ratingNumber": "4"
	//     },
	//     {
	//         "companyId": "1",
	//         "companyName": "Amazon",
	//         "ratingNumber": "3"
	//     },
	//     {
	//         "companyId": "1",
	//         "companyName": "Amazon",
	//         "ratingNumber": "5"
	//     },
	//     {
	//         "companyId": "1",
	//         "companyName": "Amazon",
	//         "ratingNumber": "4"
	//     },
	//     {
	//         "companyId": "1",
	//         "companyName": "Amazon",
	//         "ratingNumber": "1"
	//     }
	// ]

	return companyDetails ? (
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
			<hr />
			<Container maxwidth="xl">
				{/* This needs to be done */}
				<Grid
					item
					style={{
						marginTop: "40px",
						marginBottom: "50px",
						marginLeft: "200px",
					}}
				>
					<Typography variant="h3">
						<b>Find great places to work</b>
					</Typography>{" "}
					<br />
					<Typography variant="subtitle">
						Get access to millions of company reviews
					</Typography>
					<br />
					<br />
					<SearchCompaniesForm />
				</Grid>
				<Grid
					container
					spacing={-30}
					style={{
						marginTop: "30px",
						marginBottom: "60px",
						marginLeft: "180px",
					}}
				>
					{companyReviewDetails.map((item) => {
						return (
							<Col md={4}>
								<CompanyReviewCard
									companyId={item.companyId}
									companyName={item.companyName}
									ratingNumber={parseInt(item.averageRating)}
								/>
								<br />
								<br />
								<br />
							</Col>
						);
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	) : (
		<></>
	);
}
export default CompanyReview;
