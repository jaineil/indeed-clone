import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import endPointObj from '../../endPointUrl.js';
import { ReviewCard } from './ReviewCard';
import JwPagination from 'jw-react-pagination';
import RedirectUnauthorized from './RedirectUnauthorized';

import {
    Box,
    Grid,
    Card,
    CardContent,
} from '@material-ui/core';

export default function Reviews(props) {

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
            <div style={{ marginTop: '8%', height: '100%', backgroundColor: '#f2f2f2' }}>
                <br />
                <Grid container spacing={10} style={{ marginTop: "1%", marginBottom: "50px", marginLeft: '210px' }}>
                    {(pageOfItems.length === 0) ? <div style={{ marginTop: '10%', marginLeft: '30%', width: '15%', textAlign: 'center' }}>
                        <Card sx={{ display: 'flex' }} style={{ width: '100%', marginTop: '1%', borderRadius: '15px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%' }}>
                                    No Reviews Yet
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
                                                city={item.companyLocation.city}
                                                state={item.companyLocation.state}
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
                <div style={{ marginLeft: '40%' }}>
                    <JwPagination  pageSize={5} items={reviews} onChangePage={setPageOfItems} />
                </div>
            </div>
        </div>
    )

}
