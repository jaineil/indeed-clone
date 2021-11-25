import {  Box, Button, Grid, Typography} from '@material-ui/core';
import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import { getSearchData, setCurrentPage } from '../../../_actions/jobSearchActions';
import { useHistory } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import SearchInput from './SearchInput';

const useStyles = makeStyles((theme) => ({   
    input:{
        width:'100%',
        height:'45px',
        
    },
    removeMargin:{
        margin:'0'
    },
    searchForm:{
        display:'flex',
        justifyContent:'center'
    },
    btn_Container:{
        display:'flex',
        alignItems:'flex-end',
        
        '& button':{
            width:'100%',
            height:"45px",
            fontSize:'13px',
            fontWeight:'bold',
            borderRadius:'10px'
        }
    },
    suggestionInput:{
        position:'relative'
    },
    autocontainer:{
        border:`1px solid ${theme.palette.primary.main}`,
        width:'99%',
        backgroundColor:"white",
        borderBottomLeftRadius:'5px',
        borderBottomRightRadius:'5px',
        zIndex:'10',
        paddingBottom:'30px',
        position:'absolute',
        '& div':{
            marginTop:'30px'
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
    window.localStorage.setItem(key, JSON.stringify(data));
}

function InputGrid({ label, helperText, classes, setValue, value, options, setError }) {
    return (
        <Grid item lg={5} md={5} sm={5} xs={12}>
            <Typography variant='h5'>
                {label}
            </Typography>
            <FormHelperText className={classes.removeMargin}>{helperText}</FormHelperText>
            <SearchInput setValue={setValue} value={value} classes={classes} options={options} setError={setError} />
        </Grid>
    );
}

function SearchJobForm(props) {
    
    const dispatch = useDispatch()
    const classes = useStyles();
    const [job,setJob] = useState('');
    const [location,setLocation] = useState('');
    const jobOptions = ['Java Developer','Javascript Developer','React Developer','Government','Account']
    const locationOptions = ['Bangalore','Mumbai','Delhi','Kolkata','Chennai'];
    const history = useHistory()
    const [error,setError] = useState(false);
        

    const handleSearch=e=>{
        
        e.preventDefault()
        if(job === "" && location === ""){
            setError(true)
            return
        }
        dispatch(setCurrentPage(1))
        dispatch(getSearchData(job === ""?"":job,location=== "" ? "" : location))
        
        let data = loadData("recent") || []
        let str = job !== "" && location !== "" ? {category:"both" , query: `${job} - ${location}`} : job === "" && location !== "" ? {category:"location", query:`${location}`} : {category:"job",query:`${job}`}

        if(data.length === 4){
            //To get most recent job search
            data.reverse()
            if(data.some(item=>item.category===str.category && item.query === str.query)){
                data = data.filter(item=>item.category !== str.category || item.query !== str.query)
                data.push(str)
            }
            else{
                data.shift()
                data.push(str)
            }
            
        }
        else {
            if(data.some(item=>item.category===str.category && item.query===str.query)){
                data = data.filter(item=>item.category !== str.category || item.query !== str.query)
                data.push(str)
            }
            else{
                
                data.push(str)
            }
        }

        saveData("recent",data.reverse())
        history.push(`/jobs?q=${job}&location=${location}&page=1`)

        // console.log(str,"str")

    }



    // const handelSubmit = (e)=>{
    //     e.preventDefault();
    //     history.push(`/jobs/q=${job}&l=${location}`)
    // }
    return (
        <>
           { error ? <Box>Query is Empty</Box> : <></> }
            <form  onSubmit={handleSearch} className={classes.searchForm}>
                <Grid container spacing={1}>
                    
                    <InputGrid setValue={setJob} value={job} label={'What?'} 
                    helperText={'City, state, or pin code'} classes={classes}
                    options={job !== "" ?jobOptions:null}
                    setError = {setError}
                    />

                    <InputGrid setError = {setError} setValue={setLocation} value={location} label={'Where'}
                    helperText='City, state, or pin code' classes={classes}
                    options={locationOptions} />

                    <Grid item lg={2} md={2} sm={2} xs={12} className={classes.btn_Container}>
                        <Button color={'primary'} variant='contained' type='submit'>
                            Find Jobs
                        </Button>
                    </Grid>
                </Grid>
            </form>
       </>
           
        
    );
}

export default SearchJobForm;