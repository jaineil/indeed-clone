import axios from "axios";
import endPointObj from '../endPointUrl.js';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";

const registerRequest = () => {
    return {
      type: REGISTER_REQUEST,
    };
  };
  
  const registerSuccess = () => {
    return {
      type: REGISTER_SUCCESS,
    };
  };
  
  const registerFailure = (errorMsg) => {
    return {
      type: REGISTER_FAILURE,
      payload: errorMsg,
    };
  };
  
  export const makeRegisterRequest = ({ email, password }) => (dispatch) => {
    dispatch(registerRequest());
  
    axios
      .get(endPointObj.url + '/getUser')
      .then((res) => {
        dispatch(checkUserExists(email, password, res.data));
      })
      .catch((err) => dispatch(registerFailure("Something went wrong")));
  };
  
  const checkUserExists = (email, password, usersData) => (dispatch) => {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].email === email) {
        dispatch(registerFailure("user with the email id already exists"));
        return;
      }
    }
  
    dispatch(registerNewUser({ email, password }));
  };
  
  const registerNewUser = ({ email, password }) => (dispatch) => {
    axios
      .post(endPointObj.url + '/signup/jobseeker', {
        email,
        password
      })
      .then((res) => dispatch(registerSuccess()));
  };
  