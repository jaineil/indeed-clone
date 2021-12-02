import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link, Redirect } from 'react-router-dom';

export function CompanyReviewCard({companyId, companyName, ratingNumber}) {
    return (
        <Grid item container spacing={6}>
            <Grid item container spacing={6}>
                <Grid item>
                    <h6>{companyName}</h6>
                    <Grid item>
                    <Rating style={{ color: "#6b0337" }} name="half-rating-read" defaultValue={0} value={ratingNumber} size="small" readOnly /><br/>
                    <Link>Reviews</Link>&nbsp;<Link>Salaries</Link>&nbsp;<Link>Jobs</Link>
                    </Grid>
                </Grid>
                
            </Grid>
        </Grid>
    )
}
