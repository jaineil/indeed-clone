import { combineReducers } from "redux";
import signupReducer from "./signupReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { searchReducer } from "./searchReducer";
import { jobseekerReducer } from "./jobseekerReducer";
import { employerReducer } from "./employerReducer";

//It will combine the reducers that are separated into funcations, each managing independant parts of the state.
export default combineReducers({
  signup: signupReducer,
  register: registerReducer,
  login: loginReducer,
  search: searchReducer,
  jobseekerProfile: jobseekerReducer,
  employerReducer: employerReducer
});
