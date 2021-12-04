import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
} from "../_actions/actionTypes";

const initState = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  city: "",
  state: "",
  resumes: [],
  savedJobs: [],
  appliedJobs: [],
};

export const firstNameSelector = (state) => state.jobseekerProfile.firstName;
export const lastNameSelector = (state) => state.jobseekerProfile.lastName;
export const contactNumberSelector = (state) =>
  state.jobseekerProfile.contactNumber;
export const citySelector = (state) => state.jobseekerProfile.city;
export const stateSelector = (state) => state.jobseekerProfile.state;
export const resumesSelector = (state) => state.jobseekerProfile.resumes;
export const savedJobsSelector = (state) => state.jobseekerProfile.savedJobs;
export const appliedJobsSelector = (state) =>
  state.jobseekerProfile.appliedJobs;

export const jobseekerReducer = (state = initState, { type, payload }) => {
  console.log("In getProfile Reducer: ", payload);
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        ...payload.data,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
