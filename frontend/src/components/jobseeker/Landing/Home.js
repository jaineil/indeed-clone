import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchJobForm from './SearchJobForm';
import RecentJobSearch from '../Landing/RecentJobSearch';


const useStyles = makeStyles((theme) => ({
    container:{
        padding:'0px 10vw',
        marginTop:'80px'
    },
    linkContainer:{
        textAlign:'center',
        marginTop:'30px'
    },
    link:{
        fontWeight:'bolder',
        color: '#2557a7',
        fontSize: '1rem'
        //color:theme.palette.primary.main
    }
  }))

function Home() {
    const classes = useStyles();
    
    return (
        <Container className={classes.container}>
            <SearchJobForm />
            <div className={classes.linkContainer}>
                {`Employers:`}
                <Link className={classes.link} to="/postjob" >
                    {` Post a job `} 
                </Link>
            </div>
            <hr/>
            <RecentJobSearch />
        </Container>
    );
}

export default Home;