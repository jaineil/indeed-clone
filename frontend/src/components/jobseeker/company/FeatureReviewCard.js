import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

export function FeatureReviewCard({ reviewTitle, city,state,postedDate,overallStars,ratingInNumber }) {
    var date = new Date(postedDate);
    return (
        <Grid item container spacing={4}>
            <Grid item container spacing={2}>
                <Grid item>
                    <h3>{ratingInNumber}</h3>
                    <Rating style={{ color: "#6b0337" }} name="half-rating-read" defaultValue={0} value={overallStars} size="small" readOnly />
                </Grid>
                <Grid item>
                    <Typography variant = "body2" style = {{fontWeight: "600"}}><h5>{reviewTitle}</h5></Typography>
                    <Typography variant = "body3" style = {{fontWeight: "400", fontSize:"12px",color: "#595959"}}>{city},{state} - 
                    posted on  {(date.getMonth()+1) + '/'+date.getDate() + '/' + date.getFullYear()}</Typography>
                    <br/>
                </Grid>
            </Grid>
        </Grid>
    )
}
