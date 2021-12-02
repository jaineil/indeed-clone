import axios from "axios";
import {
  SAVE_JOB_FAILURE,
  SAVE_JOB_REQUEST,
  SAVE_JOB_SUCCESS,
} from "./actionTypes";
import { getProfile } from "./jobseekerActions";
import endPointObj from "../endPointUrl.js";

const saveJobRequest = () => {
  return {
    type: SAVE_JOB_REQUEST,
  };
};

const saveJobSuccess = () => {
  return {
    type: SAVE_JOB_SUCCESS,
  };
};

const saveJobFailure = () => {
  return {
    type: SAVE_JOB_FAILURE,
  };
};

export const saveJob = (payload) => (dispatch) => {
  try {
    axios
      .post(`${endPointObj.url}/job-seeker/save-job`, payload)
      .then((res) => {
        console.log("Save Response: ", res);
        dispatch(saveJobRequest());
        dispatch(getProfile(payload.jobSeekerId));
      })
      .catch((err) => {
        console.log("Error in save job: ", err);
        dispatch(saveJobFailure());
      });
  } catch (err) {}
};
