import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
	getJobSearchData,
	setCurrentPage,
} from "../../../_actions/jobSearchActions";
import { useHistory } from "react-router-dom";
import SearchInput from "../Landing/SearchInput";

const useStyles = makeStyles((theme) => ({
	input: {
		width: "100%",
		height: "45px",
	},
	removeMargin: {
		margin: "0",
	},
	searchForm: {
		display: "flex",
		justifyContent: "center",
	},
	btn_Container: {
		display: "flex",
		alignItems: "flex-end",

		"& button": {
			width: "100%",
			height: "45px",
			fontSize: "13px",
			fontWeight: "bold",
			borderRadius: "10px",
		},
	},
	suggestionInput: {
		position: "relative",
	},
	autocontainer: {
		border: `1px solid ${theme.palette.primary.main}`,
		width: "99%",
		backgroundColor: "white",
		borderBottomLeftRadius: "5px",
		borderBottomRightRadius: "5px",
		zIndex: "10",
		paddingBottom: "30px",
		position: "absolute",
		"& div": {
			marginTop: "30px",
		},
	},
}));

//Load search data
// function loadData(key) {
// 	let data = window.localStorage.getItem(key);
// 	data = JSON.parse(data);
// 	return data;
// }

// function saveData(key, data) {
// 	window.localStorage.setItem(key, JSON.queryStringingify(data));
// }

function InputGrid({
	label,
	placeholder,
	classes,
	setValue,
	value,
	options,
	setError,
	onChange,
}) {
	return (
		<Grid item lg={5} md={5} sm={5} xs={12}>
			<Typography variant="h5">{label}</Typography>
			<SearchInput
				placeholder={placeholder}
				setValue={setValue}
				value={value}
				classes={classes}
				options={options}
				setError={setError}
			/>
		</Grid>
	);
}

function SearchJobForm(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [job, setJob] = useState(undefined);
	const [location, setLocation] = useState(undefined);
	const jobOptions = [];
	const locationOptions = [
		"San Jose",
		"San Francisco",
		"New York",
		"Seattle",
	];
	const history = useHistory();
	const [error, setError] = useState(false);
	let searchedJobs = useSelector((state) => state.search.searchedJobs);

	const handleSearch = (e) => {
		console.log("Inside handle job search");
		e.preventDefault();
		if (job === "" && location === "") {
			setError(true);

			return;
		}
		dispatch(setCurrentPage(1));

		//Get job search data
		dispatch(
			getJobSearchData(
				job === "" ? undefined : job,
				location === undefined ? "" : location
			)
		);
		console.log("Inside search job form: searchedJobs", searchedJobs);

		history.push(`/displayjobs?q=${job}&location=${location}&page=1`);
		// console.log(queryString,"queryString")
	};

	return (
		<>
			<form onSubmit={handleSearch} lassName={classes.searchForm}>
				<Grid container spacing={1}>
					<InputGrid
						setValue={setJob}
						value={job}
						label={"What?"}
						placeholder={"Job title, keywords, or company"}
						classes={classes}
						options={job !== "" ? jobOptions : null}
						setError={setError}
					/>

					<InputGrid
						setError={setError}
						setValue={setLocation}
						value={location}
						label={"Where"}
						placeholder="City, state, zip code, or “remote”"
						classes={classes}
						options={locationOptions}
					/>

					<Grid
						item
						lg={2}
						md={2}
						sm={2}
						xs={12}
						className={classes.btn_Container}
					>
						<Button
							color={"primary"}
							variant="contained"
							type="submit"
						>
							Find Jobs
						</Button>
					</Grid>
				</Grid>
			</form>
			{error ? <Box>Please enter Jobtitle or location</Box> : <></>}
		</>
	);
}

export default SearchJobForm;
