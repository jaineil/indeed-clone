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
//import companyDetails from "./companyDetails";
import CompanyHeader from "./CompanyHeader";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import { AddCompanySalaryModal } from "./AddCompanySalaryModal";
import { SalaryCard } from "./SalaryCard";
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
	const location = useLocation();
	const classes = useStyle();
	const [salaryDetails, setSalaries] = useState([]);
	const { isAuth } = useSelector((state) => state.login);
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
	const [open, setOpen] = useState(false);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	const getSalaries = async () => {
		try {
			const response = await axios.get(
				`${endPointObj.url}/job-seeker/get-salaries-by-company-id/${companyId}`
			);
			console.log(response.data.response);
			setSalaries(response.data.response);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getSalaries();
	}, []);

	// var salaryDetails= [
	//     {
	//         "roleName": "Software Development Engineer",
	//         "annualSalary":14.34
	//     },
	//     {
	//         "roleName": "Quality Assurance",
	//         "annualSalary":20.00
	//     },
	//     {
	//         "roleName": "Software Engineer - Test",
	//         "annualSalary":15.45
	//     },
	//     {
	//         "roleName": "Software Engineer - Test",
	//         "annualSalary":15.45
	//     },
	//     {
	//         "roleName": "Software Engineer - Test",
	//         "annualSalary":15.45
	//     }
	// ]

	//fetch company id by localstorage
	//Call fetch company details API
	console.log("Salary  details: ", salaryDetails);

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
			<CompanyHeader />
			<hr />
			<br />
			<Container maxwidth="xl">
				<Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
					<Grid>
						<Button
							className={classes.link}
							onClick={() => handleOpen(companyId)}
							style={{
								marginBottom: "30px",
								marginLeft: "1000px",
								marginTop: "-35px",
							}}
						>
							<b>Add a Salary</b>
						</Button>

						<AddCompanySalaryModal
							open={open}
							handleClose={() => handleClose()}
							companyId={companyId}
							handleApply={() => handleApply()}
						/>
					</Grid>
				</Grid>

				{/* This needs to be done */}
				<Grid
					item
					style={{
						marginTop: "30px",
						marginBottom: "50px",
						marginLeft: "200px",
					}}
				>
					<Typography variant="h4">
						<b>Average Salaries at {companyName}</b>
					</Typography>
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
					{salaryDetails.map((item) => {
						return (
							<Col md={4}>
								<SalaryCard
									roleName={item.jobTitle}
									annualSalary={item.salary}
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
	);
}
export default CompanyReview;
