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

	// 	var jobsData = [
  //   {
  //     "jobId": "1",
  //     "jobTitle": "Software Development Engineer",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "2",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "3",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "4",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "5",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "6",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "7",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "8",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "9",
  //     "jobTitle": "SDE",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "10",
  //     "jobTitle": "Software Development Engineer",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   },
  //   {
  //     "jobId": "10",
  //     "jobTitle": "Software Development Engineer",
  //     "companyName": "amazon", 
  //     "rating": 3,
  //     "city": "San Jose",
  //     "state": "California",
  //     "salary": "120k - 140k",
  //     "jobDescription": "Software Development Engineer job description"
  //   }
  // ];
  //   console.log("Job data", jobsData);
  // dispatch(searchSuccess(jobsData));
  // dispatch(setSearchCount(jobsData.length)); 
	};
