import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import { registerReducer } from './registerReducer';

//It will combine the reducers that are separated into funcations, each managing independant parts of the state.
export default combineReducers({
    
    signup: signupReducer,
    register: registerReducer
});