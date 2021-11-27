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
    TextField
} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { createEmployerAndCompanyProfile, getEmployerProfile } from '../../_actions/employerAction';
import { Link, Redirect } from 'react-router-dom';

export default function Profile() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const[companyName, setCompanyName] = useState("");
    const[companyWebsite, setCompanyWebsite] = useState("");
    const[companyType, setCompanyType] = useState("");
    const[companyRevenue, setCompanyRevenue] = useState("");
    const[companySize, setCompanySize] = useState("");
    const[companyHeadquarters, setCompanyHeadquarters] = useState("");
    const[companyCeoName, setCompanyCeoName] = useState("");
    const[companyStreet, setCompanyStreet] = useState("");
    const[companyUnit, setCompanyUnit] = useState("");
    const[companyPincode, setCompanyPincode] = useState("");
    const[companyState, setCompanyState] = useState("");
    const[companyCountry, setCompanyCountry] = useState("");
    const[companyIndustry, setCompanyIndustry] = useState("");
    const[companyFounded, setCompanyFounded] = useState("");
    const[companyMissionAndVision, setCompanyMissionAndVision] = useState("");

    const[employerFirstName, setEmployerFirstName] = useState("");
    const[employerLastName, setEmployerLastName] = useState("");
    const[employerRole, setEmployerRole] = useState("");
    const[employerStreet, setEmployerStreet] = useState("");
    const[employerUnit, setEmployerUnit] = useState("");
    const[employerPincode, setEmployerPincode] = useState("");
    const[employerState, setEmployerState] = useState("");
    const[employerCountry, setEmployerCountry] = useState("");

    useEffect(() => {
        const employerEmailId = "test@gmail.com";
        dispatch(getEmployerProfile(employerEmailId));

    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const employerProfile = {
            companyName ,
            companyWebsite ,
            companyType ,
            companyRevenue ,
            companySize ,
            companyHeadquarters ,
            companyCeoName ,
            companyStreet ,
            companyUnit ,
            companyPincode ,
            companyState ,
            companyCountry ,
            companyIndustry ,
            companyFounded ,
            companyMissionAndVision
        }
        const companyProfile = {
            employerFirstName,
            employerLastName, 
            employerRole,
            employerStreet, 
            employerUnit, 
            employerPincode, 
            employerState,
            employerCountry 
        }
        console.log(companyProfile.employerCountry);
        dispatch(createEmployerAndCompanyProfile(employerProfile,companyProfile));
    }


    return (
        <Container className={classes.registrationContent} maxWidth="xl">
            <Navbar />
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
                                        onChange = {(e) =>{ setCompanyName(e.target.value) }}
                                        value = { companyName }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Website"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyWebsite(e.target.value) }}
                                        value = { companyWebsite }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Type"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyType(e.target.value) }}
                                        value = { companyType }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Revenue"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyRevenue(e.target.value) }}
                                        value = { companyRevenue }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Size"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanySize(e.target.value) }}
                                        value = { companySize }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        label="Headquarters"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyHeadquarters(e.target.value) }}
                                        value = { companyHeadquarters }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        label="CEO Name"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyCeoName(e.target.value) }}
                                        value = { companyCeoName }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Street Address"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyStreet(e.target.value) }}
                                        value = { companyStreet }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Unit #"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyUnit(e.target.value) }}
                                        value = { companyUnit }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Pincode"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyPincode(e.target.value) }}
                                        value = { companyPincode }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="State"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyState(e.target.value) }}
                                        value = { companyState }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Country"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyCountry(e.target.value) }}
                                        value = { companyCountry }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Industry"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyIndustry(e.target.value) }}
                                        value = { companyIndustry }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Founded"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyFounded(e.target.value) }}
                                        value = { companyFounded }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Mission and Vision"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyMissionAndVision(e.target.value) }}
                                        value = { companyMissionAndVision }
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
                                        onChange = {(e) =>{ setEmployerFirstName(e.target.value) }}
                                        value = { employerFirstName }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Last Name"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerLastName(e.target.value) }}
                                        value = { employerLastName }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Role in Company"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerRole(e.target.value) }}
                                        value = { employerRole }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Street Address"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerStreet(e.target.value) }}
                                        value = { employerStreet }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Unit #"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerUnit(e.target.value) }}
                                        value = { employerUnit }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Pincode"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerPincode(e.target.value) }}
                                        value = { employerPincode }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="State"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerState(e.target.value) }}
                                        value = { employerState }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Country"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerCountry(e.target.value) }}
                                        value = { employerCountry }
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
