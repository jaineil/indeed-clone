import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import endPointObj from '../../../endPointUrl.js';
import StarIcon from '@material-ui/icons/Star';
import {
    Grid,
    Container,
    makeStyles,
    Typography,
    Button,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import companyDetails from './companyDetails';
import CompanyHeader from './CompanyHeader';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import { AddCompanySalaryModal } from "./AddCompanySalaryModal";
import { ReviewCard } from './ReviewCard';


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
    console.log("Company details: ", companyDetails);

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


    return (

        isAuth ? (companyDetails ?
            <ThemeProvider theme={theme}>
                <Header /><hr />
                <CompanyHeader /><hr /><br />
                <Container maxwidth="xl">

                    <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
                        <Grid>
                            <Button className={classes.link} onClick={() => handleOpen(companyId)}
                                style={{ marginBottom: '30px', marginLeft: '800px', marginTop: '-35px' }}>
                                <b>Add a Salary</b>
                            </Button>
                            <AddCompanySalaryModal
                                open={open}
                                handleClose={() => handleClose()}
                                companyId={companyId}
                                handleApply={() => handleApply()}
                            />
                        </Grid>
                    </Grid>


                    {/* This needs to be done */}
                    <Grid item style={{ marginTop: "30px", marginBottom: "50px" }}>
                        <Typography variant="h4"><b>Average Salaries at {companyDetails[0].companyName}</b></Typography>
                    </Grid>
                    <Grid container spacing={10}>
                        {
                            reviews.map((item) => {
                                return (
                                    <ReviewCard
                                        key={item.id}
                                        rating={item.rating}
                                        job_position={item.job_position}
                                        date={item.date}
                                        title={item.title}
                                        description={item.description}
                                    />
                                )
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
            : <></>) : <Redirect to="/login" />
    )
}
export default CompanyReview;