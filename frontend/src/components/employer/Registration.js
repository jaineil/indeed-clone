import React, { useState } from 'react';
import { useStyles } from '../employer/Styles';

import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    TextField
} from '@material-ui/core';

const handleSubmit = (e) => {
    e.preventDefault();
    alert('Filled');
}

export default function Registration() {
    const classes = useStyles();

    return (
        <Container className={classes.registrationContent} maxWidth="xl">
            <Card sx={{ display: 'flex' }} style={{ width: '50%', marginTop: '5%', borderRadius: '15px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Card sx={{ display: 'flex' }} style={{ width: '100%', marginTop: '2%', borderRadius: '15px' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5" style={{ marginTop: '2%' }}>
                                                    Company Profile
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Name"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Website"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Type"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Revenue"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Size"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        label="Headquarters"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        label="CEO Name"
                                        style={{ width: '100%' }}
                                        required
                                    />
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
                                        label="Unit #"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Pincode"
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
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Industry"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Founded"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Mission and Vision"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Card sx={{ display: 'flex' }} style={{ width: '100%', marginTop: '2%', borderRadius: '15px' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5" style={{ marginTop: '2%' }}>
                                                    Employer Profile
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="First Name"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Last Name"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Role in Company"
                                        style={{ width: '100%' }}
                                        required
                                    />
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
                                        label="Unit #"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Pincode"
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
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit" className={classes.submitButton}>Submit</Button>
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
