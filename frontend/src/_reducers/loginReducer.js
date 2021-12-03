import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../_actions/actionTypes";

const initialState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  errorMsg: "",
  user: "",
};

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorMsg: payload,
      };
    case LOGOUT:
      localStorage.removeItem("jobseekerProfile");
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        user: "",
      };
    default:
      return state;
  }
};
