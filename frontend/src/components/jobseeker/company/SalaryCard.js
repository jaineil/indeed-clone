import React from 'react'
import { Grid, Typography } from '@material-ui/core';

export function SalaryCard({roleName, annualSalary}) {
    return (
        <Grid item container spacing={6}>
            <Grid item container spacing={6}>
                <Grid item>
                    <h6>{roleName}</h6>
                    <Typography variant = "body2"><big><b>${annualSalary}</b></big> per annum</Typography>
                </Grid>
                
            </Grid>
        </Grid>
    )
}
