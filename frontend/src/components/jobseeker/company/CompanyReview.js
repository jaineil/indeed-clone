import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import endPointObj from "../../../endPointUrl.js";
import StarIcon from "@material-ui/icons/Star";
import {
	Grid,
	Container,
	makeStyles,
	Typography,
	Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import reviewdetails from "./reviewDetails";
import CompanyHeader from "./CompanyHeader";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import { AddReviewModal } from "./AddCompanyReview";
import { ReviewCard } from "./ReviewCard";
import JwPagination from "jw-react-pagination";

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
		width: "150px",
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
	reviewContainer: {
		backgroundColor: "#f3f2f1",
		height: "200px",
		width: "800px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: "30px",
		marginTop: "50px",
		borderRadius: 10,
	},
	filterButton: {
		borderRadius: "10px",
		height: "50px",
		width: "120px",
		padding: "0 25px",
		fontSize: "15px",
		color: theme.palette.primary.main,
		border: `1px solid #000000`,
		backgroundColor: "white",
		"&:hover": {
			color: "white",
			backgroundColor: theme.palette.primary.main,
			border: `1px solid ${theme.palette.primary.main}`,
		},
	},
}));

export function CompanyReview(props) {
	const classes = useStyle();
	const [reviews, setReviews] = useState([]);
	const { isAuth } = useSelector((state) => state.login);
	const companyId = localStorage.getItem("currentcompanyid");
	const [open, setOpen] = useState(false);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
	const [helpfulness, setHelpfulness] = useState("");
	const [rating, setRating] = useState("");
	const [date, setDate] = useState("DATE");
	let [pageOfItems, setPageOfItems] = useState([]);

	useEffect(() => {
		console.log("Inside get company reviews");

		axios
			.get(endPointObj.url + "/job-seeker/company-details/reviews", {
				params: { companyId: companyId, sortBy: "HELPFULNESS" },
			})
			.then((response) => {
				console.log(
					"Get company reviews response ",
					response.data.response
				);
				setReviews(response.data.response);
			})
			.catch((err) => {
				if (err.response && err.response.data) {
					console.log("Error", err.response);
				}
			});
	}, []);

	//fetch company id by localstorage
	//Call fetch company details API
	console.log("Fetch review details: ", reviewdetails);

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

	const onHelfulnessChange = () => {
		setHelpfulness("HELPFULNESS");
	};

	const onRatingChange = () => {
		setRating("RATING");
	};
	const onDateChange = () => {
		setDate("DATE");
	};

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<hr />
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
								marginBottom: "50px",
								marginLeft: "900px",
								marginTop: "-40px",
							}}
						>
							<b>Review this company</b>
						</Button>
						<AddReviewModal
							open={open}
							handleClose={() => handleClose()}
							companyId={companyId}
							handleApply={() => handleApply()}
						/>
					</Grid>
				</Grid>

				<Container maxwidth="xl" className={classes.reviewContainer}>
					<div
						style={{
							marginLeft: "-10px",
							fontSize: "25px",
							marginBottom: "60px",
							marginTop: "35px",
						}}
						className={classes.scoreTest}
					>
						<b>Sort by</b>
					</div>
					<Button
						className={classes.filterButton}
						onClick={onHelfulnessChange}
						style={{
							marginBottom: "30px",
							marginLeft: "-300px",
							marginTop: "-40px",
						}}
					>
						<b>Helpfulness</b>
					</Button>
					<Button
						className={classes.filterButton}
						onClick={onRatingChange}
						style={{
							marginBottom: "30px",
							marginLeft: "-60px",
							marginTop: "-80px",
						}}
					>
						<b>Rating</b>
					</Button>
					<Button
						className={classes.filterButton}
						onClick={onDateChange}
						style={{
							marginBottom: "30px",
							marginLeft: "180px",
							marginTop: "-80px",
						}}
					>
						<b>Date </b>
					</Button>
				</Container>

				{/* This needs to be done */}
				<Grid
					item
					style={{
						marginTop: "30px",
						marginBottom: "50px",
						marginLeft: "310px",
					}}
				>
					<Typography variant="h4">
						<b>Reviews</b>
					</Typography>
				</Grid>
				<>
					<Grid
						container
						spacing={10}
						style={{
							marginTop: "30px",
							marginBottom: "50px",
							marginLeft: "210px",
						}}
					>
						{pageOfItems.map((item) => {
							return (
								<ReviewCard
									reviewId={item.reviewId}
									reviewTitle={item.reviewTitle}
									reviewerRole={item.reviewerRole}
									reviewDescription="Dummy description"
									city={item.city}
									state={item.state}
									postedDate={item.postedOn}
									overallStars={item.rating}
									ratingInNumber={item.rating}
									pros="Dummy pro"
									cons="Dummy cons"
									reviewHelpfulCount={item.reviewHelpfulCount}
									reviewNotHelpfulCount={
										item.reviewNotHelpfulCount
									}
								/>
							);
						})}
					</Grid>
					<JwPagination
						pageSize={5}
						items={reviews}
						onChangePage={setPageOfItems}
					/>
				</>
			</Container>
		</ThemeProvider>
	);
}
export default CompanyReview;
