import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import axios from "axios";
import endPointObj from '../../endPointUrl.js';
import RedirectUnauthorized from './RedirectUnauthorized';

import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";

import { useDispatch, useSelector } from 'react-redux';
import { updateEmployerAndUpdateCompanyProfile, updateEmployerAndCreateCompanyProfile, getEmployerProfile, getCompanyProfile } from '../../_actions/employerAction';
import { Link, Redirect } from 'react-router-dom';

export default function Profile() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let employerProfile = null;
    let companyProfile = null;

    useEffect(() => {
        employerProfile = JSON.parse(localStorage.getItem('employerProfile'));
        companyProfile = JSON.parse(localStorage.getItem('companyProfile'));
    }, [])

    console.log(JSON.stringify(employerProfile));
    console.log(JSON.stringify(companyProfile));

    useEffect(() => {
        console.log("employerProfile in useEffect is : " + JSON.stringify(employerProfile));
        if (employerProfile) {
            if (employerProfile.firstName && employerProfile.lastName) {
                setEmployerFirstName(employerProfile.firstName);
                setEmployerLastName(employerProfile.lastName);
                setEmployerRole(employerProfile.role ? employerProfile.role : "");
                setEmployerContactNumber(employerProfile.contactNumber ? employerProfile.contactNumber : "");
                setEmployerStreet(employerProfile.companyLocation.street ? employerProfile.companyLocation.street : "");
                setEmployerCity(employerProfile.companyLocation.city ? employerProfile.companyLocation.city : "");
                setEmployerState(employerProfile.companyLocation.state ? employerProfile.companyLocation.state : "");
                setEmployerCountry(employerProfile.companyLocation.country ? employerProfile.companyLocation.country : "");
                setEmployerZipcode(employerProfile.companyLocation.zipcode ? employerProfile.companyLocation.zipcode : "");
            }
            else {
                setEmployerFirstName("");
                setEmployerLastName("");
                setEmployerRole("");
                setEmployerContactNumber("")
                setEmployerStreet("");
                setEmployerCity("");
                setEmployerState("");
                setEmployerCountry("");
                setEmployerZipcode("");
            }
        }
        else {
            setEmployerFirstName("");
            setEmployerLastName("");
            setEmployerRole("");
            setEmployerContactNumber("");
            setEmployerStreet("");
            setEmployerCity("");
            setEmployerState("");
            setEmployerCountry("");
            setEmployerZipcode("");
        }
    }, [employerProfile])

    useEffect(() => {
        if (localStorage.getItem('companyId') !== "") {
            setCompanyName(companyProfile.companyName);
            setCompanyWebsite(companyProfile.websiteUrl);
            setCompanyRevenue(companyProfile.revenue);
            setCompanySize(companyProfile.companySize);
            setCompanyHeadquarters(companyProfile.headquarters);
            setCompanyCeoName(companyProfile.ceoName);
            setCompanyType(companyProfile.companyType);
            setCompanyStreet(companyProfile.companyLocation.street ? companyProfile.companyLocation.street : '');
            setCompanyCity(companyProfile.companyLocation.city);
            setCompanyZipcode(companyProfile.companyLocation.zipcode);
            setCompanyState(companyProfile.companyLocation.state);
            setCompanyCountry(companyProfile.companyLocation.country);

            setCompanyIndustry(companyProfile.industry);
            setCompanyFounded(companyProfile.founded);
            setCompanyMissionAndVision(companyProfile.description.missionAndVision);
        }
        else {
            setCompanyName("");
            setCompanyWebsite("");
            setCompanyRevenue("");
            setCompanySize("");
            setCompanyHeadquarters("");
            setCompanyCeoName("");
            setCompanyType("");
            setCompanyStreet("");
            setCompanyCity("");
            setCompanyZipcode("");
            setCompanyState("");
            setCompanyCountry("");

            setCompanyIndustry("");
            setCompanyFounded("");
            setCompanyMissionAndVision("");
        }
    }, [companyProfile])

    const [companyName, setCompanyName] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [companyRevenue, setCompanyRevenue] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [companyHeadquarters, setCompanyHeadquarters] = useState("");
    const [companyCeoName, setCompanyCeoName] = useState("");
    const [companyStreet, setCompanyStreet] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyZipcode, setCompanyZipcode] = useState("");
    const [companyState, setCompanyState] = useState("");
    const [companyCountry, setCompanyCountry] = useState("");
    const [companyIndustry, setCompanyIndustry] = useState("");
    const [companyFounded, setCompanyFounded] = useState("");
    const [companyMissionAndVision, setCompanyMissionAndVision] = useState("");

    const [employerFirstName, setEmployerFirstName] = useState("");
    const [employerLastName, setEmployerLastName] = useState("");
    const [employerRole, setEmployerRole] = useState("");
    const [employerContactNumber, setEmployerContactNumber] = useState("");
    const [employerStreet, setEmployerStreet] = useState("");
    const [employerCity, setEmployerCity] = useState("");
    const [employerState, setEmployerState] = useState("");
    const [employerCountry, setEmployerCountry] = useState("");
    const [employerZipcode, setEmployerZipcode] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        const createCompany ={
            employerId: localStorage.getItem('employerId'),
            companyName,
            websiteUrl: companyWebsite,
            companyType,
            revenue: companyRevenue,
            companySize,
            headquarters: companyHeadquarters,
            ceoName: companyCeoName,
            companyStreet,
            city: companyCity,
            zipcode: companyZipcode,
            state: companyState,
            country: companyCountry,
            industry: companyIndustry,
            founded: companyFounded,
            missionAndVision: companyMissionAndVision,
            averageRating: "0"
        }
        const updateCompany = {
            companyId: localStorage.getItem('companyId'),
            companyName,
            websiteUrl: companyWebsite,
            companyType,
            revenue: companyRevenue,
            companySize,
            headquarters: companyHeadquarters,
            ceoName: companyCeoName,
            companyStreet,
            city: companyCity,
            zipcode: companyZipcode,
            state: companyState,
            country: companyCountry,
            industry: companyIndustry,
            founded: companyFounded,
            missionAndVision: companyMissionAndVision
        }

        const updateEmployer = {
            employerId: localStorage.getItem('employerId'),
            firstName: employerFirstName,
            lastName: employerLastName,
            role: employerRole,
            contactNumber: employerContactNumber,
            street: employerStreet,
            city: employerCity,
            state: employerState,
            country: employerCountry,
            zipcode: employerZipcode,
        }
        if (localStorage.getItem('companyId')) {
            const updateEmployerProfile = axios.put(endPointObj.url + "/employer/update-profile/", updateEmployer);
            const updateCompanyProfile = axios.put(endPointObj.url + "/employer/update-company/", updateCompany);

            try {
                const [employerResponse, companyResponse] = await axios.all([updateEmployerProfile, updateCompanyProfile]);
                console.log("Employer Response: " + JSON.stringify(employerResponse));
                console.log("Company Response: " + JSON.stringify(companyResponse));
                localStorage.setItem('employerProfile', JSON.stringify({
                    employerId: localStorage.getItem('employerId'),
                    firstName: employerFirstName,
                    lastName: employerLastName,
                    role: employerRole,
                    contactNumber: employerContactNumber,
                    companyLocation: {
                        street: employerStreet,
                        city: employerCity,
                        state: employerState,
                        country: employerCountry,
                        zipcode: employerZipcode
                    },
                }));

                localStorage.setItem('companyProfile', JSON.stringify({
                    companyName : companyName,
                    websiteUrl: companyWebsite,
                    companyType: companyType,
                    revenue: companyRevenue,
                    companySize,
                    headquarters: companyHeadquarters,
                    ceoName: companyCeoName,
                    companyLocation:{
                        street: companyStreet,
                        city: companyCity,
                    zipcode: companyZipcode,
                    state: companyState,
                    country: companyCountry
                    },
                    industry: companyIndustry,
                    founded: companyFounded,
                    missionAndVision: companyMissionAndVision
                }));

                alert("Successfully Saved");
            }
            catch (err) {
                console.log(err.message);
            }
        }
        else {
            const updateEmployerProfile = axios.put(endPointObj.url + "/employer/update-profile/", 
                updateEmployer);
            const createCompanyProfile = axios.post(endPointObj.url + "/employer/createCompany/", 
                createCompany
            );

            try {
                const [employerResponse, companyResponse] = await axios.all([updateEmployerProfile, createCompanyProfile]);
                console.log("Employer Response: " + JSON.stringify(employerResponse));
                console.log("Company Response: " + JSON.stringify(companyResponse));
                localStorage.setItem('employerProfile', JSON.stringify({
                    employerId: localStorage.getItem('employerId'),
                    firstName: employerFirstName,
                    lastName: employerLastName,
                    role: employerRole,
                    contactNumber : employerContactNumber,
                    companyLocation: {
                        street: employerStreet,
                        city: employerCity,
                        state: employerState,
                        country: employerCountry,
                        zipcode: employerZipcode
                    },
                }));

                localStorage.setItem('companyProfile', JSON.stringify({
                    companyName : companyName,
                    websiteUrl: companyWebsite,
                    companyType: companyType,
                    revenue: companyRevenue,
                    companySize,
                    headquarters: companyHeadquarters,
                    ceoName: companyCeoName,
                    companyLocation:{
                        street: companyStreet,
                        city: companyCity,
                    zipcode: companyZipcode,
                    state: companyState,
                    country: companyCountry
                    },
                    industry: companyIndustry,
                    founded: companyFounded,
                    missionAndVision: companyMissionAndVision
                }));
                localStorage.setItem('companyId',companyResponse.data._id);
                alert("Successfully Saved");
            }
            catch (err) {
                console.log(err.message);
            }
        }
    }
    
    return (
        <Container className={classes.registrationContent} maxWidth="xl">
            <RedirectUnauthorized />
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
                                        onChange={(e) => { setCompanyName(e.target.value) }}
                                        value={companyName}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Website"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyWebsite(e.target.value) }}
                                        value={companyWebsite}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Type"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyType(e.target.value) }}
                                        value={companyType}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Revenue"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyRevenue(e.target.value) }}
                                        value={companyRevenue}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Size"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanySize(e.target.value) }}
                                        value={companySize}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        label="Headquarters"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyHeadquarters(e.target.value) }}
                                        value={companyHeadquarters}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        label="CEO Name"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyCeoName(e.target.value) }}
                                        value={companyCeoName}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Industry"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyIndustry(e.target.value) }}
                                        value={companyIndustry}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Founded"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyFounded(e.target.value) }}
                                        value={companyFounded}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Mission and Vision"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyMissionAndVision(e.target.value) }}
                                        value={companyMissionAndVision}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Street Address"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyStreet(e.target.value) }}
                                        value={companyStreet}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="City"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyCity(e.target.value) }}
                                        value={companyCity}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="State"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyState(e.target.value) }}
                                        value={companyState}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Country"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyCountry(e.target.value) }}
                                        value={companyCountry}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Zipcode"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setCompanyZipcode(e.target.value) }}
                                        value={companyZipcode}
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
                                        onChange={(e) => { setEmployerFirstName(e.target.value) }}
                                        value={employerFirstName}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Last Name"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerLastName(e.target.value) }}
                                        value={employerLastName}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Role in Company"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerRole(e.target.value) }}
                                        value={employerRole}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Contact Number"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerContactNumber(e.target.value) }}
                                        value={employerContactNumber}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Street Address"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerStreet(e.target.value) }}
                                        value={employerStreet}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="City #"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerCity(e.target.value) }}
                                        value={employerCity}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="State"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerState(e.target.value) }}
                                        value={employerState}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Country"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerCountry(e.target.value) }}
                                        value={employerCountry}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Zipcode"
                                        style={{ width: '100%' }}
                                        onChange={(e) => { setEmployerZipcode(e.target.value) }}
                                        value={employerZipcode}
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
