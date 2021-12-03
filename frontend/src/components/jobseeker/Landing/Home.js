import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SearchJobForm from './SearchJobForm';
import RecentJobSearch from '../Landing/RecentJobSearch';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import { useDispatch, useSelector } from 'react-redux';
import RedirectUnauthorized from '../RedirectUnauthorized';


const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0px 10vw',
        marginTop: '70px'
    },
    linkContainer: {
        textAlign: 'center',
        marginTop: '30px'
    },
    link: {
        fontWeight: 'bolder',
        color: '#2557a7',
        fontSize: '1rem'
    }
}))

function Home() {
    const styleClasses = useStyles();
    const { isAuth, user } = useSelector(state => state.login);
    console.log("isauth home", isAuth);
    console.log("Login user data: home", user);
    return (
        
        <ThemeProvider theme={theme}>
            <RedirectUnauthorized />
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
        </ThemeProvider>
    );
}

export default Home;