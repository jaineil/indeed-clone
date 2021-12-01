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
    const styleClasses = useStyles();
    const { isAuth, user } = useSelector(state => state.login);
    console.log("isauth home", isAuth);
    console.log("Login user data: home", user);
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <hr />
            <Container className={styleClasses.container}>
                <SearchJobForm />
                <div className={styleClasses.linkContainer}>
                    <Link className={styleClasses.link} to="/postresume" >
                        {` Post your resume `}
                    </Link>
                    {`It only takes a few seconds`} <br /><br />
                    {`Employers:`}
                    <Link className={styleClasses.link} to="/postjob" >
                        {` Post a job `}
                    </Link>
                </div>
            </Container>
            <hr />
            <RecentJobSearch />
        </Container>
    );
}

export default Home;