import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import {
    Grid,
    Container,
    makeStyles,
    Typography,
    Button,
    withStyles
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import companyDetails from './companyDetails';
import CompanyHeader from './CompanyHeader';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";


const useStyle = makeStyles((theme) => ({
    imgCont: {
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    optionTab: {
        cursor: "pointer",
        margin: "0 40px 0 40px",
        fontWeight: "bold"
    },
    scoreTest: {
        margin: 0,
        backgroundColor: "#f3f2f1",
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#2d2d2d",
        borderRadius: "0.5rem",
        lineHeight: "1.5",
        padding: "0.35rem 0.75rem"
    }
}))



export function CompanyJoinus(props) {
    const classes = useStyle();
    const [reviews, setReviews] = useState([]);
    const query = new URLSearchParams(props.location.search);
    const id = query.get('id')
    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.login)

    //fetch company id by localstorage

    //call get company details api
    console.log("Company details: ", companyDetails);

    return (

        isAuth ? (companyDetails ?
            <ThemeProvider theme={theme}>
                <Header /><hr />
                <CompanyHeader /><hr />
                <Container maxwidth="xl">

                    <Grid item style={{ marginTop: "20px", marginBottom: "40px" }}>
                        <Typography variant="h5"><b>About the Company</b></Typography>
                    </Grid>

                    <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
                        <Typography><p>about the company</p></Typography>
                    </Grid>

                    <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
                        <Typography variant="h5"><b>Work culture</b></Typography>
                    </Grid>

                    <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
                        <Typography><p>Work culture</p></Typography>
                    </Grid>

                    <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
                        <Typography variant="h5"><b>Company values</b></Typography>
                    </Grid>
                    <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
                        <Typography><p>Company values</p></Typography>
                    </Grid>
                </Container>
            </ThemeProvider>
            : <></>) : <Redirect to="/login" />
    )
}
export default CompanyJoinus;