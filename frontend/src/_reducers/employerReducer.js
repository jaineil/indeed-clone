import { CREATE_EMPLOYER_AND_COMPANY_PROFILE,GET_EMPLOYER_PROFILE } from "../_actions/actionTypes"

const initState = {
    employerProfile: null,
    companyProfile: null 
}

export const employerReducer = (state=initState,{type,payload})=>{
    switch (type){
        case CREATE_EMPLOYER_AND_COMPANY_PROFILE: return {
            ...state,
            employerProfile: payload.employerProfile,
            companyProfile: payload.companyProfile
        };
        default: return state
    }
}