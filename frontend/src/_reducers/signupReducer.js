import { JOBSEEKER_SIGNUP, EMPLOYEER_SIGNUP } from '../_actions/userTypes';

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case JOBSEEKER_SIGNUP:
            return {
                ...state,
                user: action.payload
            };
        case EMPLOYEER_SIGNUP:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};