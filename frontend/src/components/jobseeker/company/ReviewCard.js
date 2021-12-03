import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarIcon from "@material-ui/icons/Star";
import { Button, Grid, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import endPointObj from "../../../endPointUrl";

export function ReviewCard({
	reviewId,
	reviewTitle,
	reviewerRole,
	reviewDescription,
	city,
	state,
	postedDate,
	overallStars,
	ratingInNumber,
	pros,
	cons,
	reviewHelpfulCount,
	reviewNotHelpfulCount,
}) {
	const setHelpfulHandler = async () => {
		try {
			console.log("Review Id => ", reviewId);
			await axios.put(
				endPointObj.url +
					"/job-seeker/company-details/helpfulness-count",
				{
					reviewId: reviewId,
					helpful: true,
				}
			);
			window.location.reload(false);
		} catch (err) {
			console.error(err);
		}
		console.log("Set review as helpful");
	};

	const setNotHelpfulHandler = async () => {
		try {
			await axios.put(
				endPointObj.url +
					"/job-seeker/company-details/helpfulness-count",
				{
					reviewId: reviewId,
					helpful: false,
				}
			);
			window.location.reload(false);
		} catch (err) {
			console.error(err);
		}
		console.log("Set review as helpful");
	};
	const date = new Date(postedDate);
	return (
		<Grid item container spacing={4}>
			<Grid item container spacing={2}>
				<Grid item>
					<h3>{ratingInNumber}</h3>
					<Rating
						name="half-rating-read"
						defaultValue={0}
						value={overallStars}
						size="small"
						readOnly
					/>
				</Grid>
				<Grid item>
					<Typography variant="body2" style={{ fontWeight: "600" }}>
						<h5>{reviewTitle}</h5>
					</Typography>
					<Typography
						variant="body3"
						style={{
							fontWeight: "400",
							fontSize: "12px",
							color: "#595959",
						}}
					>
						{reviewerRole} - {city},{state} - posted on{" "}
						{`${
							date.getMonth() + 1
						}/${date.getDate()}/${date.getFullYear()}`}
					</Typography>
					<br />
					<Typography variant="subtitle1">
						{reviewDescription}
					</Typography>
				</Grid>
			</Grid>
			<Grid item container spacing={3}>
				<Typography variant="subtitle1" style={{ marginLeft: "120px" }}>
					<b>Pros:</b>
					<br />
					{pros}
				</Typography>
				<br />
				<br />
				<Typography variant="subtitle1" style={{ marginLeft: "120px" }}>
					<b>Cons:</b>
					<br />
					{cons}
				</Typography>
				<br />
				<br />
				<Typography variant="subtitle1" style={{ marginLeft: "120px" }}>
					<b></b>
				</Typography>
				<Button onClick={setHelpfulHandler}>
					Yes {reviewHelpfulCount}
				</Button>
				<Button onClick={setNotHelpfulHandler}>
					No {reviewNotHelpfulCount}
				</Button>
			</Grid>
		</Grid>
	);
}
