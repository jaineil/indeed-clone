import axios from "axios";
import endPointObj from "../endPointUrl.js";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";
import { clearProfile } from "./jobseekerActions.js";

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
  clearProfile();
  return {
    type: LOGOUT,
  };
};

export const makeLoginRequest =
  ({ emailId, pass }) =>
  (dispatch) => {
    console.log();
    dispatch(loginRequest());

    let data = {
      emailId: emailId,
      pass: pass,
    };
    axios
      .post(endPointObj.url + "/user/login", data)
      .then((response) => {
        console.log("login response", response.data[0]);
        dispatch(loginSuccess(response.data[0]));
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log("error", error.response);
          //dispatch(loginFailure(error.response.data.message));
        }
      });
  };
