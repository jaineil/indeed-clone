import { CREATE_EMPLOYER_AND_COMPANY_PROFILE,GET_EMPLOYER_PROFILE, GET_COMPANY_PROFILE } from "../_actions/actionTypes"

const initState = {
    employerProfile: null,
    companyProfile: null 
}

export const employerReducer = (state=initState,{type,payload})=>{
    switch (type){
        case CREATE_EMPLOYER_AND_COMPANY_PROFILE: 
        console.log(payload);
        return {
            ...state,
            employerProfile: payload.employerProfile,
            companyProfile: payload.companyProfile
        };
        case GET_EMPLOYER_PROFILE: 
            console.log("Inside Reducer")
        return {
            ...state,
            employerProfile: payload,
        };
        case GET_COMPANY_PROFILE: 
            console.log("Inside Reducer")
        return {
            ...state,
            companyProfile: payload,
        };
        default: return state
    }
}