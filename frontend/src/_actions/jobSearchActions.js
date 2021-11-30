import {COUNT_TOTAL_SEARCH_RESULT,SET_PAGE,SEARCH_SUCCESS,} from "./actionTypes";
import axios from "axios";
import endPointObj from '../endPointUrl.js';

  
export const searchSuccess = (payload) => {
  return {
    type: SEARCH_SUCCESS,
    payload,
  };
};

export const setCurrentPage = payload=>{
    return{
      type:SET_PAGE,
      payload
    }
} 

export const setSearchCount = (payload) => {
  return {
    type: COUNT_TOTAL_SEARCH_RESULT,
    payload,
  };
};


export const getJobSearchData = (job = "", location = "", page = "1") => (dispatch) => {

  
  //let url = `${endPointObj.url}/jobs?_page=${page}&_limit=5`;

  // if (location !== "" && job !== "") {
  //   url = `${endPointObj.url}/jobs?location_like=${location}&jobTitle_like=${job}&_page=${page}&_limit=5`;
  // } else if (location !== "") {
  //   url = `${endPointObj.url}/jobs?location_like=${location}&_page=${page}&_limit=5`;
  // } else if (job !== "") {
  //   url = `${endPointObj.url}/jobs?jobTitle_like=${job}&_page=${page}&_limit=5`;
  // } else return;
  // var config = {
  //   method: "GET",
  //   url: url,
  // };

  //fetch job first 5 records
  /*var data = {
    location: location,
    job: job
  }

  axios.post(endPointObj.url + '/jobs', data)
        .then(response => {
          console.log("Get job response", response.data);
          dispatch(searchSuccess(response.data));
          dispatch(setSearchCount(response.data.length));
      })
      .catch(error => {
          if(error.response && error.response.data) {
            console.log("error",error.response);
      }
  });*/

  var jobsData = [
    {
      "jobId": "1",
      "jobTitle": "Software Development Engineer",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "2",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "3",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "4",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "5",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "6",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "7",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "8",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "9",
      "jobTitle": "SDE",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    },
    {
      "jobId": "10",
      "jobTitle": "Software Development Engineer",
      "companyName": "amazon", 
      "rating": 3,
      "city": "San Jose",
      "state": "California",
      "salary": "120k - 140k",
      "jobDescription": "Software Development Engineer job description"
    }
  ];
  console.log("Job data", jobsData);
  dispatch(searchSuccess(jobsData));
  dispatch(setSearchCount(jobsData.length)); 

  // axios(config).then((res) => {
  //     dispatch(searchSuccess(res.data));
  //   }).then(() => {
  //     let url = `${endPointObj.url}/jobs`;

  //     if (location !== "" && job !== "") {
  //       url = `${endPointObj.url}/jobs?location_like=${location}&jobTitle_like=${job}`;
  //     } else if (location !== "") {
  //       url = `${endPointObj.url}/jobs?location_like=${location}`;
  //     } else if (job !== "") {
  //       url = `${endPointObj.url}/jobs?jobTitle_like=${job}`;
  //     }
  //     axios({
  //       method: "GET",
  //       url: url,
  //     }).then((res) => {
  //       //Count result length for search job
  //       dispatch(setSearchCount(res.data.length));
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("error", err);
  //   });
};
  