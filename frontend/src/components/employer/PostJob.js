import React, { useState } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import { Redirect } from 'react-router';
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
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';

import endPointObj from '../../endPointUrl.js';
import axios from "axios";

export default function PostJob() {
    const classes = useStyles();
    const [companyName, setCompanyName] = useState(localStorage.getItem('companyProfile')? JSON.parse(localStorage.getItem('companyProfile')).companyName : "");
    const [jobTitle, setJobTitle] = useState("");
    const [industry, setIndustry] = useState("");
    const [workType, setWorkType] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [salary, setSalary] = useState(null);
    const [requirements,setRequirements] = useState("");
    const [whyUs,setWhyUs] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country,setCountry] = useState("");
    const [zipcode,setZipcode] = useState("");
    const [redirectVar,setRedirectVar] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
            const saveJobResponse = await axios.post(endPointObj.url+ "/employer/postJob", {
                companyId : localStorage.getItem('companyId'),
                employerId : localStorage.getItem('employerId'),
                companyName: companyName,
                jobTitle : jobTitle,
                industry : industry,
                jobLocation: {
                    street : streetAddress,
                    city : city,
                    state : state,
                    country : country,
                    zipcode : zipcode
                },
                jobType : jobType,
                remote : (workType === "Remote") ? true : false,
                jobDescription : {
                    description: jobDescription,
                    responsibilities: responsibilities,
                    requirements: requirements,
                    whyUs: whyUs
                },
                salary : salary
            });
            console.log("Employer Response: " + JSON.stringify(saveJobResponse));
            console.log(saveJobResponse.status);
            if(saveJobResponse.status === 200){
                console.log("Here");
                setRedirectVar(<Redirect to="/employer/jobs" />);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const workTypeChange = (e) =>{
        setWorkType(e.target.value)
    }
    const jobTypeChange = (e) =>{
        setJobType(e.target.value)
    }


    return (
        <Container className={classes.registrationContent} maxWidth="xl">
             <RedirectUnauthorized />
            {console.log("Redirect Var is :"+ redirectVar)}
            {redirectVar}
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
                                        value = {companyName}
                                        disabled='true'
                                        onChange = {(e) =>{ setCompanyName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Job Title"
                                        style={{ width: '100%' }}
                                        required
                                        value = {jobTitle}
                                        onChange = {(e) =>{ setJobTitle(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Industry"
                                        style={{ width: '100%' }}
                                        required
                                        value = {industry}
                                        onChange = {(e) =>{ setIndustry(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography component="div" style={{ marginTop: '4%',fontWeight:'bolder', marginRight:'35%' }}>
                                        Work Type
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <RadioGroup name="workType" onChange={workTypeChange} value={workType}>
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
                                    <RadioGroup name="jobType" onChange={jobTypeChange} value={jobType}>
                                        <FormControlLabel className={classes.formhelperText}  value="Part Time" control={<Radio />} label="Part Time"
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
                                        label="Description"
                                        style={{ width: '100%' }}
                                        required
                                        value = {jobDescription}
                                        onChange = {(e) =>{ setJobDescription(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Responsibilities"
                                        style={{ width: '100%' }}
                                        required
                                        value = {responsibilities}
                                        onChange = {(e) =>{ setResponsibilities(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Requirements"
                                        style={{ width: '100%' }}
                                        required
                                        value = {requirements}
                                        onChange = {(e) =>{ setRequirements(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Why Us"
                                        style={{ width: '100%' }}
                                        required
                                        value = {whyUs}
                                        onChange = {(e) =>{ setWhyUs(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Salary"
                                        style={{ width: '100%' }}
                                        required
                                        value = {salary}
                                        type = "number"
                                        onChange = {(e) =>{ setSalary(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Street Address"
                                        style={{ width: '100%' }}
                                        required
                                        value = {streetAddress}
                                        onChange = {(e) =>{ setStreetAddress(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="City"
                                        style={{ width: '100%' }}
                                        required
                                        value = {city}
                                        onChange = {(e) =>{ setCity(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="State"
                                        style={{ width: '100%' }}
                                        required
                                        value = {state}
                                        onChange = {(e) =>{ setState(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Country"
                                        style={{ width: '100%' }}
                                        required
                                        value = {country}
                                        onChange = {(e) =>{ setCountry(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Zipcode"
                                        style={{ width: '100%' }}
                                        required
                                        value = {zipcode}
                                        onChange = {(e) =>{ setZipcode(e.target.value) }}
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
