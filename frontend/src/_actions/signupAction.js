import { JOBSEEKER_SIGNUP, EMPLOYEER_SIGNUP } from "./userTypes";
import endPointObj from '../endPointUrl.js';
import axios from "axios";

export const signup = (restaurantData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(endPointObj.url + '/signup/jobseeker', restaurantData)
        .then(response => dispatch({
            type: JOBSEEKER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: JOBSEEKER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}