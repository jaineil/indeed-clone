import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import endPointObj from "../../../endPointUrl.js";
import {
	Grid,
	Container,
	makeStyles,
	OutlinedInput,
	Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import companyDetails from "./companyDetails";
import Modal from "@material-ui/core/Modal";
import CompanyHeader from "./CompanyHeader";
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		outline: "none",
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
		height: "30px",
		width: "400px",
		margin: "10px 0",
		borderRadius: 10,
	},
	salaryContainer: {
		backgroundColor: "#f2f2f2",
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	boxImg: {
		width: "450px",
		display: "flex",
		height: "40px",
		justifyContent: "center",
		margin: "60px 0 30px",
	},
}));

export const AddCompanySalaryModal = ({ open, handleClose }) => {
	const classes = useStyles();

	const { isAuth } = useSelector((state) => state.login);
	const companyId = localStorage.getItem("currentcompanyid");
	const [companyName, setCompanyName] = React.useState("");
	const [isCurrentEmployee, setIsCurrentEmployee] = React.useState(true);
	const [jobEndDate, setJobEndDate] = React.useState("");
	const [jobTitle, setJobTitle] = React.useState("");
	const [jobCity, setJobCity] = React.useState("");
	const [jobState, setJobState] = React.useState("");
	const [annualSalary, setAnnualSalary] = React.useState("");
	const [yearsOfExperience, setYearsOfExperience] = React.useState("");
	const [paidTimeof, setPaidTimeof] = React.useState(false);
	const [healthInsurance, setHealthInsurance] = React.useState(false);
	const [lifeInsurance, setLifeInsurance] = React.useState(false);
	const [dentalInsurance, setDentalInsurance] = React.useState(false);
	const [retirement, setRetirement] = React.useState(false);

	console.log("Company details: ", companyDetails);

	const postSalary = (e) => {
		e.preventDefault();
		console.log("Inside Post salary");
		if (isAuth == true) {
			const data = {
				jobSeekerId: localStorage.getItem("userId"),
				companyId: localStorage.getItem("currentcompanyid"),
				companyName: companyName,
				isCurrentEmployee: isCurrentEmployee,
				jobEndDate: jobEndDate,
				jobTitle: jobTitle,
				jobLocation: { city: jobCity, state: jobState },
				salary: annualSalary,
				yearsOfExperience: yearsOfExperience,
				benefits: {
					paidTimeoff: paidTimeof,
					healthInsurance: healthInsurance,
					lifeInsurance: lifeInsurance,
					dentalOrVisionInsurance: dentalInsurance,
					retirement: retirement,
				},
			};
			axios
				.post(endPointObj.url + "/job-seeker/add-new-salary", data)
				.then((response) => {
					console.log("Response after salary posting", response);
					this.setState({
						message: response.data.status,
					});
				})
				.catch((err) => {
					console.log("Error", err.response);
					if (err.response && err.response.data) {
						this.setState({
							message: err.response.data,
						});
					}
				});
		} else if (isAuth == false) {
			<Redirect to="/login" />;
		}
	};

	console.log(
		"Addsalary -> User emailid",
		localStorage.getItem("userEmailId")
	);

	const onCompanyNameChange = (e) => {
		setCompanyName(e.target.value);
	};

	const onIsCurrentEmployeeChange = (e) => {
		console.log("IsCurrentEmployeeChange", isCurrentEmployee);
		setIsCurrentEmployee(e.target.value);
	};
	const onIsCurrentDateChange = (e) => {
		console.log("IsCurrentDate", isCurrentEmployee);
		setJobEndDate(e.target.value);
	};

	const onJobTitleChange = (e) => {
		setJobTitle(e.target.value);
	};
	const onJobCityChange = (e) => {
		setJobCity(e.target.value);
	};
	const onJobStateChange = (e) => {
		setJobState(e.target.value);
	};
	const onAnnualSalaryChange = (e) => {
		setAnnualSalary(e.target.value);
	};
	const onYearsOfExperienceChange = (e) => {
		setYearsOfExperience(e.target.value);
	};
	const onPaidTimeofChange = (e) => {
		setPaidTimeof(e.target.value);
		console.log("P", paidTimeof);
	};
	const onHealthInsuranceChange = (e) => {
		setHealthInsurance(e.target.value);
		console.log("H", healthInsurance);
	};
	const onLifeInsuranceChange = (e) => {
		setLifeInsurance(e.target.value);
		console.log("L", lifeInsurance);
	};
	const onDentalInsuranceChange = (e) => {
		setDentalInsurance(e.target.value);
		console.log("D", dentalInsurance);
	};
	const onRetirementChange = (e) => {
		setRetirement(e.target.value);
	};
	console.log("P", paidTimeof);
	console.log("H", healthInsurance);
	console.log("L", lifeInsurance);

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

					<form onSubmit={postSalary}>
						<Grid item>
							<label style={{ display: "block" }}>
								What’s your company name?
							</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onCompanyNameChange}
								value={companyName}
							/>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>
								Are you currently working at this company?
							</label>
							<select
								name="isCurrentEmployee"
								value={isCurrentEmployee}
								onChange={onIsCurrentEmployeeChange}
								style={{ width: "10em", height: "2em" }}
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>{" "}
							<br />
						</Grid>
						{console.log("currtne", isCurrentEmployee)}
						{isCurrentEmployee === "false" ? (
							<Grid item>
								<label style={{ display: "block" }}>
									End Date
								</label>
								<OutlinedInput
									type="date"
									className={classes.borderlinedInput}
									required
									style={{ width: "500px" }}
									onChange={onIsCurrentDateChange}
									value={jobEndDate}
								/>
							</Grid>
						) : (
							<></>
						)}

						<Grid item>
							<label style={{ display: "block" }}>
								What’s your job title?
							</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onJobTitleChange}
								value={jobTitle}
							/>
						</Grid>

						<Grid item>
							<label style={{ display: "block" }}>
								Where’s your job location, city?
							</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onJobCityChange}
								value={jobCity}
							/>
						</Grid>

						<Grid item>
							<label style={{ display: "block" }}>State</label>
							<OutlinedInput
								type="text"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onJobStateChange}
								value={jobState}
							/>
						</Grid>

						<Grid item>
							<label style={{ display: "block" }}>
								What’s your pay at?
							</label>
							<OutlinedInput
								type="number"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onAnnualSalaryChange}
								value={annualSalary}
							/>
						</Grid>
						<Grid item>
							<label style={{ display: "block" }}>
								How many years of relevant experience do you
								have?
							</label>
							<OutlinedInput
								type="number"
								className={classes.borderlinedInput}
								required
								style={{ width: "500px" }}
								onChange={onYearsOfExperienceChange}
								value={yearsOfExperience}
							/>
						</Grid>

						<Grid item>
							<label style={{ display: "block" }}>
								Which benefits do you receive?
							</label>
							<input
								type="checkbox"
								id="paidTimeof, "
								name="paidTimeof"
								onChange={onPaidTimeofChange}
							/>
							<label for="paidTimeof">Paid Time off</label>

							<input
								type="checkbox"
								id="healthInsurance"
								name="healthInsurance"
								onChange={onHealthInsuranceChange}
							/>
							<label for="healthInsurance">
								Health insurance
							</label>

							<input
								type="checkbox"
								id="lifeInsurance"
								name="lifeInsurance"
								onChange={onLifeInsuranceChange}
							/>
							<label for="lifeInsurance">Life Insurance </label>

							<input
								type="checkbox"
								id="dentalInsurance"
								name="dentalInsurance"
								onChange={onDentalInsuranceChange}
							/>
							<label for="dentalInsurance">
								Dental Insurance
							</label>
							<br />

							<input
								type="checkbox"
								id="retirement"
								name="retirement"
								onChange={onRetirementChange}
							/>
							<label for="pickup">Retirement</label>
							<br />
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
							Post Salary
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
