import React from 'react'
import { Grid, Typography } from '@material-ui/core';

export function JobsCard({jobTitle, city, state, daysPosted}) {
    return (
        <Grid item container spacing={2}>
            <Grid item container spacing={2}>
                <Grid item>
                    <h6>{jobTitle}</h6>
                    <Typography variant = "body2">{city}, {state}</Typography>

                    <Typography variant = "body2">Posted before {daysPosted}</Typography>
                </Grid>
                
            </Grid>
        </Grid>
    )
}
