import axios from "axios";
import {
  SAVE_JOB_FAILURE,
  SAVE_JOB_REQUEST,
  SAVE_JOB_SUCCESS,
} from "./actionTypes";

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

export const saveJob = ({ user_id, saved_jobs }) => (dispatch) => {
  dispatch(saveJobRequest());
    //Save job request
    console.log("Save job request actions");
};
