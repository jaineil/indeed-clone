import axios from "axios";
import endPointObj from '../endPointUrl.js';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

const loginFailure = (errorMsg) => {
  return {
    type: LOGIN_FAILURE,
    payload: errorMsg,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const makeLoginRequest = ({ emailId, pass }) => (dispatch) => {
  dispatch(loginRequest());

  let data = {
    emailId: emailId,
    pass: pass
  }
  axios.post(endPointObj.url+ "/user/login", data)
      .then(response => dispatch(loginSuccess(
           response.data)))
      .catch((err) => dispatch(loginFailure("Something went wrong")));
};