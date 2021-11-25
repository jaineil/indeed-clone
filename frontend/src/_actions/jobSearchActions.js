import {COUNT_TOTAL_RESULT,SET_PAGE,FETCH_SUCCESS,} from "./actionTypes";
import axios from "axios";
import endPointObj from '../endPointUrl.js';

  
  export const fetchSuccess = (payload) => {
    return {
      type: FETCH_SUCCESS,
      payload,
    };
  };
  
  export const setCurrentPage = payload=>{
      return{
        type:SET_PAGE,
        payload
      }
  } 

  export const setCount = (payload) => {
    return {
      type: COUNT_TOTAL_RESULT,
      payload,
    };
  };
  
  export const dispatchCount = (payload) => (dispatch) => {
    const { job, location, start, jobType } = payload;
    // console.log(job,location,start)
  
    var config = {
      method: "GET",
      url: `${endPointObj.url}/jobs`,
      params: {
        q: job,
        city_like: location,
        jobType_like: jobType,
        _start: start
      },
    };
  
    axios(config).then((res) => {
      // console.log("data",res.data)
      dispatch(setCount(res.data.length));
    });
  };
  
  export const getSearchData = (job = "", location = "", page = "1") => (dispatch) => {
  
    let url = `${endPointObj.url}/jobs?_page=${page}&_limit=5`;
  
    if (location !== "" && job !== "") {
      url = `${endPointObj.url}/jobs?location_like=${location}&jobTitle_like=${job}&_page=${page}&_limit=5`;
    } else if (location !== "") {
      url = `${endPointObj.url}/jobs?location_like=${location}&_page=${page}&_limit=5`;
    } else if (job !== "") {
      url = `${endPointObj.url}/jobs?jobTitle_like=${job}&_page=${page}&_limit=5`;
    } else return;
  
    var config = {
      method: "GET",
      url: url,
    };
  
    axios(config)
      .then((res) => {
        dispatch(fetchSuccess(res.data));
        // res.data.results?.map(item=>dispatch(addJobs(item)))
      })
      .then(() => {
        let url = `${endPointObj.url}/jobs`;
  
        if (location !== "" && job !== "") {
          url = `${endPointObj.url}/jobs?location_like=${location}&jobTitle_like=${job}`;
        } else if (location !== "") {
          url = `${endPointObj.url}/jobs?location_like=${location}`;
        } else if (job !== "") {
          url = `${endPointObj.url}/jobs?jobTitle_like=${job}`;
        }
        axios({
          method: "GET",
          url: url,
        }).then((res) => {
          dispatch(setCount(res.data.length));
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  