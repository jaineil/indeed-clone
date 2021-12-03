import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Switch from '@mui/material/Switch';
import { useState,useEffect } from 'react';
import axios from 'axios';
import endPointObj from '../../endPointUrl';

export function ReviewCard({ reviewTitle, reviewerRole, reviewDescription, city, state, postedDate, overallStars, ratingInNumber, featuredReview, pros, cons,reviewId, companyId }) {

    const handleChange= (e) => {
        console.log("Here 2");
        setChecked(!checked);
    }

    const [checked,setChecked] = useState(false);
    // if(featuredReview){
    //     console.log("Here 1");
    //     setChecked(true);
    // }

    useEffect(async () => {
        if(!featuredReview && checked===true){
            try {
                featuredReview = true;
                const postFeaturedReviewResponse = await axios.post(endPointObj.url + "/employer/post-featured-review/",{
                    companyId: companyId,
                    reviewId : reviewId,
                });
                console.log(postFeaturedReviewResponse);
            }
            catch (err) {
                console.log("Error in fetching company reviews" + err);
            }
        }
    }, [checked])

    return (
        <div>
            <Grid container spacing={12}>
                <Grid container spacing={2} style={{marginTop:'1%'}}>
                    <Grid item xs={2}>
                        <h3>{ratingInNumber}</h3>
                        <Rating name="half-rating-read" defaultValue={0} value={overallStars} size="small" readOnly />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body2" style={{ fontWeight: "600" }}><h5>{reviewTitle}</h5></Typography>
                        <Typography variant="body3" style={{ fontWeight: "400", fontSize: "12px", color: "#595959" }}>{reviewerRole} - {city},{state}</Typography>
                        <br />
                        <Typography variant="subtitle1" >
                            {reviewDescription}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            checked={checked || featuredReview}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            label="Featured Review"
                        />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={6} hidden={(pros) ? false : true}>
                        <Typography variant="subtitle1" >
                            <b>Pros:</b><br />
                            <Grid container>
                            <Grid item xs={12} style={{ marginTop: '2%' }}>
                                {
                                    pros.map((pro) => {
                                        return (
                                            <Typography variant="h6" style={{ color: "#000000", fontFamily: 'Open Sans' }}>{pro}</Typography>
                                        );
                                    })
                                }
                            </Grid>
                        </Grid>
                        </Typography><br /><br />
                    </Grid>
                    <Grid item xs={6} hidden={(cons) ? false : true}>
                        <Typography variant="subtitle1">
                            <b>Cons:</b><br />
                            {cons}
                            <Grid container>
                            <Grid item xs={12} style={{ marginTop: '2%' }}>
                                {
                                    cons.map((con) => {
                                        return (
                                            <Typography variant="h6" style={{ color: "#000000", fontFamily: 'Open Sans' }}>{con}</Typography>
                                        );
                                    })
                                }
                            </Grid>
                        </Grid>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
