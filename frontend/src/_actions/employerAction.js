import axios from "axios";
import endPointObj from '../endPointUrl.js';

import {
    CREATE_EMPLOYER_AND_COMPANY_PROFILE,
    GET_EMPLOYER_PROFILE,
    GET_COMPANY_PROFILE
} from "./actionTypes";

export const updateEmployerAndCreateCompanyProfile = (employerProfile,companyProfile) => async (dispatch) => {
    //dispatch(loginRequest());

    const updateEmployerProfile = axios.post(endPointObj.url+ "/employer/update-profile/", {
        employerProfile
      });
    const updateCompanyProfile = axios.post(endPointObj.url+ "/employer/updateCompany/", {
        companyProfile
      });

    try {
        const [employerResponse, companyResponse] = await axios.all([ updateEmployerProfile, updateCompanyProfile ]);
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

  export const updateEmployerAndUpdateCompanyProfile = (employerProfile,companyProfile) => async (dispatch) => {
    //dispatch(loginRequest());

    const updateEmployerProfile = axios.post(endPointObj.url+ "/employer/update-profile/", {
        employerProfile
      });
    const updateCompanyProfile = axios.post(endPointObj.url+ "/employer/updateCompany/", {
        companyProfile
      });

    try {
        const [employerResponse, companyResponse] = await axios.all([ updateEmployerProfile, updateCompanyProfile ]);
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

  export const getEmployerProfile = (mongoId) => async (dispatch) => {

    try {
        const employer = await axios.get(endPointObj.url+ "/employer/get-profile?employerId=" + mongoId);

        console.log("Returned an Employer from backend: " + JSON.stringify(employer.data));
        if(employer.data){
            dispatch({
                type: GET_EMPLOYER_PROFILE,
                payload : employer.data
            })
        }
        else{
            dispatch({
                type: GET_EMPLOYER_PROFILE,
                payload : null
            })
        }
       
    }
    catch (err) {
        console.log(err.message);
        dispatch({
            type: GET_EMPLOYER_PROFILE,
            payload : null
        })
    }
  };
