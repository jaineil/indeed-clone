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

const loginSuccess = (currentUser) => {
  return {
    type: LOGIN_SUCCESS,
    payload: currentUser,
  };
};

const loginFailure = (errorMsg) => {
  return {
    type: LOGIN_FAILURE,
    payload: errorMsg,
  };
};

export const logout = () => {
  window.localStorage.clear();
  return {
    type: LOGOUT,
  };
};

export const makeLoginRequest = ({ email, password }) => (dispatch) => {
  dispatch(loginRequest());

  axios.get(endPointObj.url+ "/users")
    .then((res) => {
      dispatch(authenticateUser(email, password, res.data));
    })
    .catch((err) => dispatch(loginFailure("Somthing went wrong")));
};

const authenticateUser = (email, password, usersData) => (dispatch) => {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email === email && usersData[i].password === password) {
      dispatch(loginSuccess(usersData[i]));
      return;
    } else {
      if (usersData[i].email === email && usersData[i].password !== password) {
        dispatch(loginFailure("Wrong password"));
        return;
      }
    }
  }
  axios.post(endPointObj.url + '/user/login', data)
        .then(response => {
          console.log("login response", response.data[0]);
          dispatch(loginSuccess(response.data[0]))
          
      })
        .catch(error => {
            if(error.response && error.response.data) {
              console.log("error",error.response);
              dispatch(loginFailure(error.response.data.message)); 
            }
        });
};
