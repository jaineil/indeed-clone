import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import {
    Grid,
    Container,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import companyDetails from './companyDetails';
import { Link } from 'react-router-dom';


const useStyle = makeStyles((theme) => ({
    imgCont: {
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginBottom: "10px",
        marginLeft: "500px"
    },
    optionTab: {
        cursor: "pointer",
        margin: "0 40px 0 40px",
        color: "#000000",
        textDecoration: "none",
        '&:hover': {
            borderBottom: "5px solid #000000",
            fontWeight: "bold",
            color: "#000000"
        },
        'a.focus': {
            borderBottom: "5px solid #000000",
            fontWeight: "bold",
            color: "#000000"
        }
    }
}))

export default function CompanyHeader(props) {
    const classes = useStyle();
    const { isAuth } = useSelector(state => state.login)
    console.log("Company image", companyDetails[0].homeImage);
    return (
        isAuth ? (companyDetails ?
            <Container maxwidth="xl">
                <Grid container style={{ justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <Grid container item lg={6} md={7} sm={8}>
                        <Grid item className={classes.imgCont} >
                            {/* Need to add company image */}
                            <img src={companyDetails[0].homeImage} alt="Company home page" width="500px" height="200px" />
                        </Grid>
                        <Grid item style={{ paddingTop: "40px", paddingLeft: "200px" }}>
                            <Typography variant="h5" >{companyDetails[0].companyName}</Typography>
                            <Typography variant="h6" >
                                {companyDetails[0].featuresReviews.overallStars}
                                <StarIcon style={{ color: "#9d2b6b", paddingRight: "10px" }} />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container style={{ height: "40px", paddingLeft: "200px" }}>
                    <Grid item className={classes.optionTab} style={{ textDecoration: "none" }} component={Link} to="/companyhome">
                        SnapShot
                    </Grid>
                    <Grid item className={classes.optionTab} style={{ textDecoration: "none" }} component={Link} to="/joinus">
                        Why Join Us
                    </Grid>
                    <Grid item className={classes.optionTab} style={{ textDecoration: "none" }} component={Link} to="/companyreview">
                        Reviews
                    </Grid>
                    <Grid item className={classes.optionTab} style={{ textDecoration: "none" }} component={Link} to="/companysalary">
                        Salaries
                    </Grid>
                    <Grid item className={classes.optionTab} style={{ textDecoration: "none" }} component={Link} to="/companyphotos">
                        Photos
                    </Grid>
                    <Grid item className={classes.optionTab} style={{ textDecoration: "none" }} component={Link} to="/joinus">
                        Jobs
                    </Grid>
                </Grid>

            </Container>
            : <></>) : <Redirect to="/login" />
    )
}