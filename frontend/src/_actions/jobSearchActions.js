import {
	COUNT_TOTAL_SEARCH_RESULT,
	SET_PAGE,
	SEARCH_SUCCESS,
} from "./actionTypes";
import axios from "axios";
import endPointObj from "../endPointUrl.js";

export const searchSuccess = (payload) => {
	return {
		type: SEARCH_SUCCESS,
		payload,
	};
};

export const setCurrentPage = (payload) => {
	return {
		type: SET_PAGE,
		payload,
	};
};

export const setSearchCount = (payload) => {
	return {
		type: COUNT_TOTAL_SEARCH_RESULT,
		payload,
	};
};

export const getJobSearchData =
	(job = "", location = "") =>
	(dispatch) => {
		console.log("Inside get job search data", job, location);

		axios
			.get(endPointObj.url + "/job-seeker/search-jobs", {
				params: {
					searchQuery: job,
					location: location,
				},
			})
			.then((response) => {
				console.log("Get job response", response.data.response);
				dispatch(searchSuccess(response.data.response));
				dispatch(setSearchCount(response.data.response.length));
			})
			.catch((error) => {
				if (error.response && error.response.data) {
					console.log("error", error.response);
				}
			});
	};

export const getJobTabData =
	(job = "", location = "", companyId) =>
	(dispatch) => {
		console.log("Inside get job tab search data", job, location, companyId);

		axios
			.get(endPointObj.url + "/job-seeker/get-jobs-for-company", {
				params: {
					companyId: companyId,
					jobTitle: job,
					location: location,
				},
			})
			.then((response) => {
				console.log("Get job tab response", response.data.response);
				dispatch(searchSuccess(response.data.response));
				dispatch(setSearchCount(response.data.response.length));
			})
			.catch((error) => {
				console.log("Errorrr", error);
				if (error.response && error.response.data) {
					console.log("error", error.response);
				}
			});
	};
