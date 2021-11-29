import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import { registerReducer } from './registerReducer';
import { loginReducer } from './loginReducer';
import { employerReducer } from './employerReducer';
import { searchReducer } from './searchReducer';


//It will combine the reducers that are separated into funcations, each managing independant parts of the state.
export default combineReducers({
    
    signup: signupReducer,
    register: registerReducer,
    login: loginReducer,
    employer: employerReducer,
    search: searchReducer
});