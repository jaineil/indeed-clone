import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import endPointObj from '../../../endPointUrl.js';
import {
    Grid,
    Container,
    makeStyles,
    Typography,Button, Box
} from '@material-ui/core';
import { Col, Row} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import companyDetails from '../company/companyDetails';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import companydetails from '../company/companyDetails';
import { CompanyReviewCard } from './CompanyReviewCard.js';
import SearchJobForm from '../Landing/SearchJobForm.js';

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
    },
    link: {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        height: '53px',
        padding: '0 25px',
        fontSize: '15px',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: 'white',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'white',
            border: `1px solid ${theme.palette.primary.main}`

        }
    }
}))

export function CompanyReview(props) {
    const classes = useStyle();
    const [reviews, setReviews] = useState([]);
    const { isAuth } = useSelector(state => state.login);
    const companyId = localStorage.getItem("currentcompanyid");
    const [open, setOpen] = useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        console.log("Inside get company salaries");
        // axios.get(endPointObj.url + '/job-seeker/company-details/reviews/' + companyId)
        //     .then(response => {
        //         console.log("Get company reviews response", response.data);
        //         setReviews(response.data);
        //     })
        //     .catch(err => {
        //         if (err.response && err.response.data) {
        //             console.log("Error", err.response);
        //         }
        //     });
        

    }, [])

    //fetch company id by localstorage
    //Call fetch company details API
    console.log("Salary  details: ", companydetails);

    const handleOpen = (id) => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleApply = () => {
        setOpen(false);
        forceUpdate();
    }

    var companyReviewDetails= [
        {
            "companyId": "1",
            "companyName": "Amazon",
            "ratingNumber": "4"
        },
        {
            "companyId": "1",
            "companyName": "Amazon",
            "ratingNumber": "3"
        },
        {
            "companyId": "1",
            "companyName": "Amazon",
            "ratingNumber": "5"
        },
        {
            "companyId": "1",
            "companyName": "Amazon",
            "ratingNumber": "4"
        },
        {
            "companyId": "1",
            "companyName": "Amazon",
            "ratingNumber": "1"
        }   
    ]

    return (

         (companyDetails ?
            <ThemeProvider theme={theme}>
                <Header /><hr />
                <Container maxwidth="xl">

                    {/* This needs to be done */}
                    <Grid item style={{ marginTop: "40px", marginBottom: "50px", marginLeft: "200px" }}>
                        <Typography variant="h3"><b>Find great places to work</b></Typography> <br/>
                        <Typography variant="subtitle">Get access to millions of company reviews</Typography>
                        <br/><br/>
                        <SearchJobForm />
                    </Grid>
                    <Grid container spacing={-30} style={{ marginTop: "30px", marginBottom: "60px", marginLeft: "180px" }} >
                        {
                            companyReviewDetails.map((item) => {
                                return (
                                    <Col md={4}>
                                    <CompanyReviewCard
                                        companyId={item.companyId}
                                        companyName={item.companyName}
                                        ratingNumber={item.ratingNumber}
                                    /><br/><br/><br/>
                                    </Col>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
            : <></>)
    )
}
export default CompanyReview;