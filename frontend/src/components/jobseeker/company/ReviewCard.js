import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

export function ReviewCard({ reviewTitle, reviewerRole,reviewDescription,city,state,postedDate,overallStars,ratingInNumber, pros,cons }) {
    return (
        <Grid item container spacing={4}>
            <Grid item container spacing={2}>
                <Grid item>
                    <h3>{ratingInNumber}</h3>
                    <Rating name="half-rating-read" defaultValue={0} value={overallStars} size="small" readOnly />
                </Grid>
                <Grid item>
                    <Typography variant = "body2" style = {{fontWeight: "600"}}><h5>{reviewTitle}</h5></Typography>
                    <Typography variant = "body3" style = {{fontWeight: "400", fontSize:"12px",color: "#595959"}}>{reviewerRole} - {city},{state} - posted on {postedDate}</Typography>
                    <br/>
                    <Typography variant="subtitle1" >
                        {reviewDescription}
                </Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Typography variant="subtitle1" style ={{marginLeft:"120px"}}>
                    <b>Pros:</b><br/>
                    {pros}
                </Typography><br/><br/>
                <Typography variant="subtitle1" style ={{marginLeft:"-105px", marginTop:"50px"}}>
                    <b>Cons:</b><br/>
                    {cons}
                </Typography>
            </Grid>
        </Grid>
    )
}
