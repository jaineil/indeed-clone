import { COUNT_TOTAL_SEARCH_RESULT,
    FETCH_ERROR, 
    FETCH_JOBS_ID_SUCCESS,
     FETCH_LOADING, 
     SEARCH_SUCCESS, 
     SET_PAGE} from "../_actions/actionTypes"

const init = {
isLoading :false,
isError:false,
searchedJobsJobs:[],
jobsById:{},
totalCount:null,
page:1
}

export const searchReducer = (state=init, {type,payload}) =>{
switch(type){
    case FETCH_LOADING:
        return{
            ...state,
            isLoading:true,
            isError:false
        }
    case FETCH_ERROR:
        return{
            ...state,
            isLoading:false,
            isError:true
        }
    case SEARCH_SUCCESS:
        return{
            ...state,
            isLoading:false,
            isError:false,
            searchedJobs:payload.reverse()
        }
    
    case COUNT_TOTAL_SEARCH_RESULT:
        return{
            ...state,
            totalCount:payload
        }

    case FETCH_JOBS_ID_SUCCESS:
        return{
            ...state,
            jobsById:payload
        }

    case SET_PAGE:
        return{
            ...state,
            page:payload
        }

    default:
        return state
}
}