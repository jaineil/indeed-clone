import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';

import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createEmployerAndCompanyProfile, getEmployerProfile, getCompanyProfile } from '../../_actions/employerAction';
import { Link, Redirect } from 'react-router-dom';

export default function PostJob() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

    }


    return (
        <Container className={classes.registrationContent} maxWidth="xl">
            <Navbar />
            <Card sx={{ display: 'flex' }} style={{ width: '50%', marginTop: '5%', borderRadius: '15px' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" style={{ marginTop: '2%' }}>
                        Create a job post
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ display: 'flex' }} style={{ width: '50%', marginTop: '1%', borderRadius: '15px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Company Name"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Job Title"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Industry"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography component="div" style={{ marginTop: '4%',fontWeight:'bolder', marginRight:'35%' }}>
                                        Work Type
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <RadioGroup name="role" value="role">
                                        <FormControlLabel className={classes.formhelperText} value="Remote" control={<Radio />} label="Remote"
                                            style={{
                                                border: "1px solid #cccccc",
                                                height: "48px",
                                                width: "400px",
                                                margin: "10px 0",
                                                borderRadius: 10
                                            }} />
                                        <FormControlLabel className={classes.formhelperText} value="In Person" control={<Radio />} label="In Person"
                                            style={{
                                                border: "1px solid #cccccc",
                                                height: "48px",
                                                width: "400px",
                                                margin: "10px 0",
                                                borderRadius: 10
                                            }} />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography component="div" style={{ marginTop: '4%',fontWeight:'bolder', marginRight:'35%' }}>
                                        Job Type
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <RadioGroup name="role" value="role">
                                        <FormControlLabel className={classes.formhelperText} value="Part Time" control={<Radio />} label="Part Time"
                                            style={{
                                                border: "1px solid #cccccc",
                                                height: "48px",
                                                width: "400px",
                                                margin: "10px 0",
                                                borderRadius: 10
                                            }} />
                                        <FormControlLabel className={classes.formhelperText} value="Full Time" control={<Radio />} label="Full Time"
                                            style={{
                                                border: "1px solid #cccccc",
                                                height: "48px",
                                                width: "400px",
                                                margin: "10px 0",
                                                borderRadius: 10
                                            }} />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Street Address"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="City"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="State"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Country"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Zipcode"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit" className={classes.submitButton}>Post</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                    <br />
                </Box>
            </Card>
            <br />
        </Container>
    )
}
