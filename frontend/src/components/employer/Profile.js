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

import { useDispatch,useSelector } from 'react-redux';
import { createEmployerAndCompanyProfile, getEmployerProfile, getCompanyProfile } from '../../_actions/employerAction';
import { Link, Redirect } from 'react-router-dom';

export default function Profile() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mongoId = "61a1899070aa0513ab04bdb0";
    useEffect(() => {
        dispatch(getEmployerProfile(mongoId));
    },[])

    const employerProfile = useSelector( (state) => state.employer.employerProfile);
    const companyProfile = useSelector( (state) => state.employer.companyProfile);

    useEffect(() => {
        if (employerProfile) {
            if(employerProfile.firstName && employerProfile.lastName){
                setEmployerFirstName( employerProfile.firstName);
                setEmployerLastName (employerProfile.lastName);
                setEmployerRole (employerProfile.role ? employerProfile.role : "");
                setEmployerStreet (employerProfile.companyLocation.street ? employerProfile.companyLocation.street : "");
                setEmployerCity( employerProfile.companyLocation.city ? employerProfile.companyLocation.city : "");
                setEmployerState (employerProfile.companyLocation.state ? employerProfile.companyLocation.state : "");
                setEmployerCountry (employerProfile.companyLocation.country ? employerProfile.companyLocation.country : "");
                setEmployerZipcode (employerProfile.companyLocation.zipcode ? employerProfile.companyLocation.zipcode : "");
                dispatch(getCompanyProfile(mongoId));
            }
            else{
                setEmployerFirstName( "" );
                setEmployerLastName ("");
                setEmployerRole ("");
                setEmployerStreet ("");
                setEmployerCity("");
                setEmployerState ("");
                setEmployerCountry ("");
                setEmployerZipcode("");
            }
        }
        else {
            setEmployerFirstName( "" );
            setEmployerLastName ("");
            setEmployerRole ("");
            setEmployerStreet ("");
            setEmployerCity("");
            setEmployerState ("");
            setEmployerCountry ("");
            setEmployerZipcode("");
        }
    },[employerProfile])

    useEffect(() => {
        if (companyProfile) {

        }
        else {

        }
    },[companyProfile])


    console.log("Employer Profile now: " + JSON.stringify(employerProfile));
    const[companyName, setCompanyName] = useState("");
    const[companyWebsite, setCompanyWebsite] = useState("");
    const[companyType, setCompanyType] = useState("");
    const[companyRevenue, setCompanyRevenue] = useState("");
    const[companySize, setCompanySize] = useState("");
    const[companyHeadquarters, setCompanyHeadquarters] = useState("");
    const[companyCeoName, setCompanyCeoName] = useState("");
    const[companyStreet, setCompanyStreet] = useState("");
    const[companyCity, setCompanyCity] = useState("");
    const[companyZipcode, setCompanyZipcode] = useState("");
    const[companyState, setCompanyState] = useState("");
    const[companyCountry, setCompanyCountry] = useState("");
    const[companyIndustry, setCompanyIndustry] = useState("");
    const[companyFounded, setCompanyFounded] = useState("");
    const[companyMissionAndVision, setCompanyMissionAndVision] = useState("");

    const[employerFirstName, setEmployerFirstName] = useState("");
    const[employerLastName, setEmployerLastName] = useState("");
    const[employerRole, setEmployerRole] = useState("");
    const[employerStreet, setEmployerStreet] = useState("");
    const[employerCity, setEmployerCity] = useState("");
    const[employerState, setEmployerState] = useState("");
    const[employerCountry, setEmployerCountry] = useState("");
    const[employerZipcode, setEmployerZipcode] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const companyProfile = {
            companyName ,
            companyWebsite ,
            companyType ,
            companyRevenue ,
            companySize ,
            companyHeadquarters ,
            companyCeoName ,
            companyStreet ,
            companyCity ,
            companyZipcode ,
            companyState ,
            companyCountry ,
            companyIndustry ,
            companyFounded ,
            companyMissionAndVision
        }
        const employerProfile = {
            employerFirstName,
            employerLastName, 
            employerRole,
            employerStreet, 
            employerCity,
            employerState,
            employerCountry,
            employerZipcode
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
                                        label="City"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyCity(e.target.value) }}
                                        value = { companyCity }
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
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Zipcode"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setCompanyZipcode(e.target.value) }}
                                        value = { companyZipcode }
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
                                        label="City #"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerCity(e.target.value) }}
                                        value = { employerCity }
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
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Zipcode"
                                        style={{ width: '100%' }}
                                        onChange = {(e) =>{ setEmployerZipcode(e.target.value) }}
                                        value = { employerZipcode }
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
