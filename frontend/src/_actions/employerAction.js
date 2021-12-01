import axios from "axios";
import endPointObj from '../endPointUrl.js';

import {
    CREATE_EMPLOYER_AND_COMPANY_PROFILE,
    GET_EMPLOYER_PROFILE
} from "./actionTypes";

export const createEmployerAndCompanyProfile = (employerProfile,companyProfile) => async (dispatch) => {
    //dispatch(loginRequest());

    const createEmployerProfile = axios.post(endPointObj.url+ "/createEmployerProfile", {
        employerProfile
      });
    const createCompanyProfile = axios.post(endPointObj.url+ "/createCompanyProfile", {
        companyProfile
      });

    try {
        const [employerResponse, companyResponse] = await axios.all([ createEmployerProfile, createCompanyProfile ]);
        console.log("Employer Response: " + employerResponse);
        console.log("Company Response: " + companyResponse);
        dispatch({
            type: CREATE_EMPLOYER_AND_COMPANY_PROFILE,
            payload : null
        })
    }
    catch (err) {
        console.log(err.message);
        dispatch({
            type: CREATE_EMPLOYER_AND_COMPANY_PROFILE,
            payload : null
        })
    }
  };

  export const getEmployerProfile = (emailId) => async (dispatch) => {
    //dispatch(loginRequest());

    try {
        const employer = await axios.get(endPointObj.url+ "/getEmployerProfile/" + emailId);

        console.log("Employer : " + employer);
        dispatch({
            type: GET_EMPLOYER_PROFILE,
            payload : null
        })
    }
    catch (err) {
        console.log(err.message);
        dispatch({
            type: GET_EMPLOYER_PROFILE,
            payload : null
        })
    }
  };