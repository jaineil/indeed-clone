import {  REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS, USER_ALREADY_EXISTS } from "../_actions/actionTypes";

const initState = {
    isLoading:false,
    isError:false,
    errorMsg:"",
    success:false,
    userAlreadyExistsMsg:"",
}

export const registerReducer = (state=initState,{type,payload})=>{
    switch (type){
        case REGISTER_REQUEST: return {
            ...state,
            isLoading:true
        };
        case REGISTER_SUCCESS: return {
            ...state,
            success:true,
            isLoading:false,
        };
        case REGISTER_FAILURE: return {
            ...state,
            isError:true,
            isLoading:false,
            success:false,
            errorMsg:payload
        }
        case USER_ALREADY_EXISTS: return {
            ...state,
            isError:true,
            isLoading:false,
            success:false,
            userAlreadyExistsMsg:payload
        }
        default: return state
    }
}