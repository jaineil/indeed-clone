import { Box, Button, Grid, Typography,OutlinedInput } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import { getJobSearchData, setCurrentPage } from '../../../_actions/jobSearchActions';
import { useHistory } from 'react-router-dom';
import SearchInput from './SearchInput';

const useStyles = makeStyles((theme) => ({
    input: {
        width: '100%',
        height: '45px',

    },
    removeMargin: {
        margin: '0'
    },
    searchForm: {
        display: 'flex',
        justifyContent: 'center'
    },
    btn_Container: {
        display: 'flex',
        alignItems: 'flex-end',

        '& button': {
            width: '100%',
            height: "45px",
            fontSize: '13px',
            fontWeight: 'bold',
            borderRadius: '10px'
        }
    },
    suggestionInput: {
        position: 'relative'
    },
    autocontainer: {
        border: `1px solid ${theme.palette.primary.main}`,
        width: '99%',
        backgroundColor: "white",
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        zIndex: '10',
        paddingBottom: '30px',
        position: 'absolute',
        '& div': {
            marginTop: '30px'
        },

    },
}))

//Load search data  
function loadData(key) {
    let data = window.localStorage.getItem(key);
    data = JSON.parse(data);
    return data;

}


function saveData(key, data) {
    window.localStorage.setItem(key, JSON.queryStringingify(data));
}
{/* <InputGrid setValue={setJob} value={job} label={'What?'} 
    placeholder={'City, state, or pin code'} classes={classes}
    options={job !== "" ?jobOptions:null}
    setError = {setError}
/> */}

function InputGrid({ label, placeholder, classes, setValue, value, options, setError,onChange }) {
    return (
        <Grid item lg={5} md={5} sm={5} xs={12}>
            <Typography variant='h5'>
                {label}
            </Typography>
            <SearchInput placeholder={placeholder} setValue={setValue} value={value} classes={classes} options={options} setError={setError} 
            />
        </Grid>
    );
}

function SearchJobForm(props) {

    const dispatch = useDispatch()
    const classes = useStyles();
    const [job, setJob] = useState("");
    const [location, setLocation] = useState('San Jose');
    const jobOptions = ['Software Developer', 'Software development engineer', 'Data scientist', 'Data Engineer', 'Software Tester'];
    const locationOptions = ['San Jose', 'San Francisco', 'New York', 'Seattle'];
    const history = useHistory()
    const [error, setError] = useState(false);
    const[suggestion, setSuggestion] = useState("");
    let searchedJobs = useSelector(state => state.search.searchedJobs)


    const handleSearch = (e) => {
        console.log("Inside handle job search");
        e.preventDefault()
        if (job === "" && location === "") {
            setError(true)

            return
        }
        dispatch(setCurrentPage(1))

        //Get job search data
        dispatch(getJobSearchData(job === "" ? undefined : job, location === undefined ? "" : location));
        console.log("Inside search job form: searchedJobs", searchedJobs);

        history.push(`/displayjobs?q=${job}&location=${location}&page=1`)
        // console.log(queryString,"queryString")
    }

    const fetchJobSuggestionsHandler = (e) => {
        setJob(e.target.value);
        const searchQuery = e.target.value;
        console.log("Checking => ", searchQuery);
        if ((job.length+1) >= 3) {
            axios.get(endPointObj.url + '/job-seeker/search-suggestions', {params:{
                searchQuery: searchQuery,
              }}
                .then(response => {
                  console.log("Get suggestion response", response.data);
              })
                  .catch(error => {
                      if(error.response && error.response.data) {
                        console.log("error",error.response);
                  }
              }));    
        }
    }
    console.log("Checking => ", suggestion);
    return (
        <>

            <form onSubmit={handleSearch} lassName={classes.searchForm}>
                <Grid container spacing={1}>

                    {/* <OutlinedInput type ="text" setValue={setJob} value={job} label={'What?'}
                        placeholder={'Job title, keywords, or company'} classes={classes}
                        options={job !== "" ? jobOptions : null}
                        onChange={fetchJobSuggestionsHandler}
                        setError={setError}
                    /> */}

                    <OutlinedInput type="text" className={classes.borderlinedInput} required style={{ width: '500px' }}
                    onInput={fetchJobSuggestionsHandler} value={job} />



                    <InputGrid setError={setError} setValue={setLocation} value={location} label={'Where'}
                        placeholder='City, state, zip code, or “remote”' classes={classes}
                        options={locationOptions} />

                    <Grid item lg={2} md={2} sm={2} xs={12} className={classes.btn_Container}>
                        <Button color={'primary'} variant='contained' type='submit'>
                            Find Jobs
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error ? <Box>Please enter Jobtitle or location</Box> : <></>}
        </>
    );
}

export default SearchJobForm;