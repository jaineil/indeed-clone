import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    OutlinedInput,
    FormHelperText,
    TextField,
    Button
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const showApplicant = (applicantId) => {
    console.log(applicantId);
}

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Candidates(props) {
    console.log(JSON.stringify(props));
    const classes = useStyles();

    const [applicants, setApplicants] = useState([]);
    const [applicantId, setApplicantId] = useState('');
    const [showApplicant, setShowApplicant] = useState(false);
    const [applicationStatus, setApplicationStatus] = React.useState('');

    const handleChange = (event) => {
        setApplicationStatus(event.target.value);
    };

    const emailId = 'harperlee@gmail.com';
    const city = 'San Jose';

    useEffect(() => {
        console.log("Candidates Fetch");
    }, applicants)

    let redirectComponent = null;
    if (!props.location.state) {
        alert('Select a job to view candidates');
        redirectComponent = <Redirect to="/jobs" />
    }

    const columns = [
        {
            field: 'resume',
            headerName: 'Resume',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                    >
                        View Resume
                    </Button>
                </strong>
            ),
        },
        {
            field: 'coverLetter',
            headerName: 'Cover Letter',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                    >
                        View Cover Letter
                    </Button>
                </strong>
            ),
        },
        {
            field: 'applicantName',
            headerName: 'Applicant Name',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <strong>
                    <a
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16, textDecoration: 'none', cursor:'pointer' }}
                        onClick={() => {
                            setApplicantId(params.row.rowId);
                            setShowApplicant(true);
                        }
                        }
                    >
                        {params.value}
                    </a>
                </strong>
            ),
        },
    ];

    const rows = [
        { id: 1, resume: "Resume Id 1", coverLetter: "Cover Letter Id 1", applicantName: "Applicant Name 1", rowId: "Applicant 1" },
        { id: 2, resume: "Resume Id 2", coverLetter: "Cover Letter Id 2", applicantName: "Applicant Name 2", rowId: "Applicant 2" }
    ];

    return (
        <div>
            {redirectComponent}
            <Navbar current='dashboard' />
            <DashboardItems current="candidates" />
            <div hidden={showApplicant} style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <div>
                    <br />
                    Applicants for Job : {props.location.state ? (props.location.state.rowId ? props.location.state.rowId : '') : ''}
                </div>
                <Card sx={{ display: 'flex' }} style={{ width: '75%', marginTop: '1%', marginLeft: '15%', borderRadius: '15px', height: '50%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%', height: '100%' }}>
                            <div style={{ height: '100%', width: '100%' }} className={classes.root}>
                                <DataGrid rows={rows} columns={columns} disableColumnMenu hideFooterSelectedRowCount={true} />
                            </div>
                        </CardContent>
                    </Box>
                </Card>

            </div>
            <div hidden={!showApplicant} style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <br />
                <Card sx={{ display: 'flex' }} style={{ width: '75%', marginTop: '1%', marginLeft: '15%', borderRadius: '15px', height: '50%' }}>
                    <Grid container style={{ marginTop: '5%' }}>
                        <Grid item xs={6}>
                            <Grid item xs={12} style={{ marginRight: '60%' }}>
                                <Typography className={classes.h5} variant="h5" style={{ fontWeight: "bolder", color: "#000000", fontFamily: 'Open Sans', fontSize: 'xx-large' }}>Harper Lee</Typography>
                            </Grid>
                            <Grid item xs={12} style={{ marginLeft: '6.5%', textAlign: 'left' }}>
                                {emailId} {bull} {city}
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl style={{ width: '50%' }}>
                                <InputLabel id="application-status">Application Status</InputLabel>
                                <Select
                                    labelId="application-status"
                                    id="status_select"
                                    value={applicationStatus}
                                    label="Application Status"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="submitted">Submitted</MenuItem>
                                    <MenuItem value="reviewed">Reviewed</MenuItem>
                                    <MenuItem value="initialScreening">Initial Screening</MenuItem>
                                    <MenuItem value="interviewing">Interviewing</MenuItem>
                                    <MenuItem value="hired">Hired</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </Card>

            </div>
        </div>
    )

}
