import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import { Grid, Typography } from '@material-ui/core'

export function ReviewCard({ rating, job_position, date, title, description }) {
    return (
        <Grid item container spacing={4}>
            <Grid item container spacing={2}>
                <Grid item>
                    <AccountCircleIcon fontSize = "large" />
                </Grid>
                <Grid item>
                    <Typography variant = "body2" style = {{fontWeight: "600"}}>{job_position}</Typography>
                    <Typography variant = "h6">
                        {rating}
                        <StarIcon fontSize="small" style = {{color: "#9d2b6b"}} />
                        <Typography variant = "caption" > on {date}</Typography>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Typography variant="h6" style ={{marginLeft:"20px"}}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {description}
                </Typography>
            </Grid>
        </Grid>
    )
}
