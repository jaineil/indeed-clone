import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import endPointObj from '../../endPointUrl.js';
import { ReviewCard } from './ReviewCard';
import reviewDetails from '../jobseeker/company/reviewDetails';
import JwPagination from 'jw-react-pagination';
import RedirectUnauthorized from './RedirectUnauthorized';

import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const showApplicant = (applicantId) => {
    console.log(applicantId);
}

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Candidates(props) {

    const companyId = localStorage.getItem('companyId');
    const [reviews, setReviews] = useState([]);
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(async () => {
        try {
            const reviews = await axios.get(endPointObj.url + "/employer/view-reviews/" + companyId);

            console.log("Returned reviews for company: " + JSON.stringify(reviews.data));
            if (reviews.data) {
                setReviews(reviews.data);
            }
        }
        catch (err) {
            console.log("Error in fetching company reviews" + err);
        }
    }, [])

    return (
        <div>
            <RedirectUnauthorized />
            <Navbar current='reviews' />
            <div style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <br />
                <Grid container spacing={10} style={{ marginTop: "30px", marginBottom: "50px", marginLeft: '210px' }}>
                    {(pageOfItems.length === 0) ? <div style={{ marginTop: '10%', marginLeft: '30%', width:'15%', textAlign:'center' }}>
                        <Card sx={{ display: 'flex' }} style={{ width: '100%', marginTop: '1%', borderRadius: '15px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%' }}>
                                    No Reviews Found
                                </CardContent>
                            </Box>
                        </Card>
                    </div> : null}
                    {
                        pageOfItems.map((item) => {
                            return (
                                <Card sx={{ display: 'flex' }} style={{ width: '75%', marginTop: '1%', borderRadius: '15px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%' }}>
                                            <ReviewCard
                                                reviewTitle={item.reviewTitle}
                                                reviewerRole={item.reviewerRole}
                                                reviewDescription={item.reviewBody}
                                                city={item.city}
                                                state={item.state}
                                                postedDate={item.postedDate}
                                                overallStars={item.overallCompanyRatingByReviewer}
                                                ratingInNumber={item.overallCompanyRatingByReviewer}
                                                pros={item.pros}
                                                cons={item.cons}
                                                reviewId={item.reviewId}
                                                featuredReview={item.featuredReview}
                                                companyId={companyId}
                                            />
                                        </CardContent>
                                    </Box>
                                </Card>
                            )
                        })
                    }
                </Grid>
                <JwPagination pageSize={5} items={reviews} onChangePage={setPageOfItems} />
            </div>
        </div>
    )

}
