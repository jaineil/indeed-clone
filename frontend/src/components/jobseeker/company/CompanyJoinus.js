import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";
import {
	Grid,
	Container,
	makeStyles,
	Typography,
	Button,
	withStyles,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import companyDetails from "./companyDetails";
import CompanyHeader from "./CompanyHeader";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import endPointObj from "../../../endPointUrl.js";

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

export function CompanyJoinus(props) {
	const classes = useStyle();
	const [reviews, setReviews] = useState([]);
	const query = new URLSearchParams(props.location.search);
	const id = query.get("id");
	const dispatch = useDispatch();
	const { isAuth } = useSelector((state) => state.login);
	const [companyDetails, setCompany] = useState([]);
	const companyId = localStorage.getItem("currentcompanyid");

	//fetch company id by localstorage

	const getCompanyDetails = async () => {
		try {
			const response = await axios.get(
				`${endPointObj.url}/job-seeker/company-details/join-us/${companyId}`
			);
			console.log("why join us", response.data.response);
			setCompany(response.data.response);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getCompanyDetails();
	}, []);

	//call get company details api
	console.log("Company details: ", companyDetails);

	return isAuth ? (
		companyDetails ? (
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
				<Container maxwidth="xl">
					<Grid
						item
						style={{ marginTop: "20px", marginBottom: "40px" }}
					>
						<Typography variant="h5">
							<b>About the Company</b>
						</Typography>
					</Grid>

					<Grid
						item
						style={{ marginTop: "20px", marginBottom: "50px" }}
					>
						<Typography>
							<p>{companyDetails.about}</p>
						</Typography>
					</Grid>

					<Grid
						item
						style={{ marginTop: "20px", marginBottom: "30px" }}
					>
						<Typography variant="h5">
							<b>Work culture</b>
						</Typography>
					</Grid>

					<Grid
						item
						style={{ marginTop: "20px", marginBottom: "50px" }}
					>
						<Typography>
							<p>{companyDetails.workCulture}</p>
						</Typography>
					</Grid>

					<Grid
						item
						style={{ marginTop: "20px", marginBottom: "50px" }}
					>
						<Typography variant="h5">
							<b>Company values</b>
						</Typography>
					</Grid>
					<Grid
						item
						style={{ marginTop: "20px", marginBottom: "50px" }}
					>
						<Typography>
							<p>{companyDetails.values}</p>
						</Typography>
					</Grid>
				</Container>
			</ThemeProvider>
		) : (
			<></>
		)
	) : (
		<Redirect to="/login" />
	);
}
export default CompanyJoinus;
