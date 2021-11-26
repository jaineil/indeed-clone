import {  REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from "../_actions/actionTypes";

const initState = {
    isLoading:false,
    isError:false,
    errorMsg:"",
    success:false,
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
            errorMsg:payload
        }
        default: return state
    }
}