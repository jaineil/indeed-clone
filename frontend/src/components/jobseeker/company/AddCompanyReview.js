import React, { useEffect, useState, useSelector } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, OutlinedInput } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { Redirect } from "react-router-dom";
import endPointObj from "../../../endPointUrl.js";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	applyForm: {
		boxSizing: "border-box",
		width: "600px",
		borderRadius: "10px",
		height: "1000px",
		backgroundColor: "white",
		outline: "none",
		padding: "40px",
	},
	label: {
		marginBottom: "20px",
	},
	borderlinedInput: {
		border: "1px solid #cccccc",
		height: "35px",
		width: "400px",
		margin: "10px 0",
		borderRadius: 10,
	},
}));

export const AddReviewModal = ({ open, handleClose }) => {
	const classes = useStyles();

	const [rating, setRatingValue] = React.useState(0);
	const [reviewerRole, setReviewerRole] = React.useState("");
	const [reviewTitle, setReviewTitle] = React.useState("");
	const [reviewBody, setReviewBody] = React.useState("");
	const [pros, setProps] = React.useState("");
	const [cons, setCons] = React.useState("");
	const [ceoApproval, setCeoApproval] = React.useState("");
	const [interviewPrepTips, setInterviewPrepTips] = React.useState("");
	const [refresh, setRefresh] = React.useState("");

	console.log("Rating selected", rating);
	const postReview = (e) => {
		console.log("Company id", localStorage.getItem("currentcompanyid"));
		console.log("Inside postreview");
		console.log("Rating selected", rating);
		console.log("User id", localStorage.getItem("userId"));
		e.preventDefault();

		const data = {
			jobseekerId: localStorage.getItem("userId"),
			companyId: localStorage.getItem("currentcompanyid"),
			rating: rating,
			reviewerRole: reviewerRole,
			reviewTitle: reviewTitle,
			reviewBody: reviewBody,
			pros: pros,
			cons: cons,
			ceoApproval: ceoApproval,
			interviewPrepTips: interviewPrepTips,
		};
		console.log("req data", data);

		axios
			.post(
				`${endPointObj.url}/job-seeker/company-details/add-review`,
				data
			)
			.then((response) => {
				console.log("Response after job review posting", response);
				handleClose();
				setRefresh(" ");
			})
			.catch((err) => {
				console.log("Error", err.response);
				if (err.response && err.response.data) {
					// this.setState({
					// 	message: err.response.data,
					// });
					console.log(err.response);
				}
			});
	};
	const onReviewerRoleChange = (e) => {
		setReviewerRole(e.target.value);
	};
	const onReviewTitleChange = (e) => {
		setReviewTitle(e.target.value);
	};
	const onSetReviewBody = (e) => {
		setReviewBody(e.target.value);
	};
	const onSetProps = (e) => {
		setProps(e.target.value);
	};
	const onSetCons = (e) => {
		setCons(e.target.value);
	};
	const onSetCeoApproval = (e) => {
		setCeoApproval(e.target.value);
	};
	const onsetInterviewPrepTips = (e) => {
		setInterviewPrepTips(e.target.value);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				position: "relative",
			}}
		>
			<Modal
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className={classes.applyForm}>
					{/* <div>{jobId}</div> */}

					<form onSubmit={postReview}>
						<Grid item>
							<label
								style={{ margin: "10px 0px", display: "block" }}
							>
								Overall rating (On scale of 1 to 5)
							</label>
							<Rating
								name="simple-controlled"
								value={rating}
								onChange={(event, newValue) => {
									setRatingValue(newValue);
								}}
							/>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>
								Your role at the company
							</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onReviewerRoleChange}
								value={reviewerRole}
							/>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>
								Review Title
							</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onReviewTitleChange}
								value={reviewTitle}
							/>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>
								Your Review
							</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onSetReviewBody}
								value={reviewBody}
							/>
						</Grid>

						<Grid container>
							<Grid item>
								<label style={{ display: "block" }}>Pros</label>
								<OutlinedInput
									type="text"
									className={classes.borderlinedInput}
									required
									style={{ width: "500px" }}
									onChange={onSetProps}
									value={pros}
								/>
							</Grid>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>Cons</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onSetCons}
								value={cons}
							/>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>
								CEO Approval
							</label>
							<OutlinedInput
								type="number"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onSetCeoApproval}
								value={ceoApproval}
							/>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>
								How should prepare for an interview?
							</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onsetInterviewPrepTips}
								value={interviewPrepTips}
							/>
						</Grid>
						{/* <UploadForm /> */}
						<Button
							type="submit"
							color="primary"
							style={{
								marginRight: "30px",
								marginLeft: "100px",
								backgroundColor: "rgb(37, 87, 167)",
								color: "#ffffff",
							}}
						>
							Post Review
						</Button>
						<Button variant="outlined" onClick={handleClose}>
							cancel
						</Button>
					</form>
				</div>
			</Modal>
		</div>
	);
};
