import axios from "axios";
import endPointObj from '../endPointUrl.js';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_ALREADY_EXISTS
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

  const userAlreadyExists = (errorMsg) => {
    return {
      type: USER_ALREADY_EXISTS,
      payload: errorMsg,
    };
  };
  
  export const userRegistration = ({ emailId, pass, userPersona }) => (dispatch) => {
    console.log("Inside user registration dispatch request", emailId,pass, userPersona);
    dispatch(registerRequest());
    let data = {
      emailId: emailId 
    } 
    axios.post(endPointObj.url + '/user/getuser', data)
      .then((res) => {
        console.log("get user data", res.data);
        if (res.data.length > 0) {
          console.log("FAIL");
          dispatch(userAlreadyExists("User with the email already exists!"));
          return;  
        } else {
          console.log("SUCCESS");
          dispatch(registerNewUser({ emailId, pass, userPersona }));
        }
        
      })
      .catch((err) => dispatch(registerFailure("Something went wrong")));
  };
  
  // const checkUserExists = (emailId, pass, userPersona, usersData) => (dispatch) => {
  //   for (let i = 0; i < usersData.length; i++) {
  //     if (usersData[i].emailId === emailId) {
  //       dispatch(registerFailure("user with the email id already exists"));
  //       return;
  //     }
  //   }
  
  //   dispatch(registerNewUser({ emailId, pass, userPersona }));
  // };
  
  const registerNewUser = ({ emailId, pass, userPersona }) => (dispatch) => {
    let data = {
      emailId: emailId,
      pass: pass,
      userPersona: userPersona  
    }
    axios
      .post(endPointObj.url + '/user/signup', data)
      .then((res) => dispatch(registerSuccess()));
  };
  