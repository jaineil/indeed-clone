import axios from "axios";
import endPointObj from "../endPointUrl.js";

import { UPDATE_PROFILE, GET_PROFILE, CLEAR_PROFILE } from "./actionTypes";

export const updateProfile = (jobSeekerProfile) => async (dispatch) => {
  try {
    axios
      .put(endPointObj.url + "/job-seeker/update-profile", jobSeekerProfile)
      .then((res) => {
        if (res.status === 200) {
          console.log("Job Seeker : " + res);
          dispatch(getProfile(jobSeekerProfile.jobseekerId));
          dispatch({
            type: UPDATE_PROFILE,
            payload: jobSeekerProfile,
          });
        } else {
          dispatch({
            type: UPDATE_PROFILE,
            payload: null,
          });
        }
      })
      .catch((err) => {
        console.log("Err in Update Profile: ", err);
        dispatch({
          type: UPDATE_PROFILE,
          payload: null,
        });
      });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: UPDATE_PROFILE,
      payload: null,
    });
  }
};

export const getProfile = (jobseekerId) => async (dispatch) => {
  try {
    axios
      .get(
        endPointObj.url + "/job-seeker/get-profile?jobseekerId=" + jobseekerId
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_PROFILE,
            payload: res,
          });
        } else {
          dispatch({
            type: GET_PROFILE,
            payload: null,
          });
        }
      })
      .catch((err) => {
        console.log("Err in Get Profile: ", err);
        dispatch({
          type: GET_PROFILE,
          payload: null,
        });
      });
  } catch (err) {
    console.log("Error in Get Profile Action: ", err.message);
  }
};

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};
