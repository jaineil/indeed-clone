import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import endPointObj from '../../endPointUrl.js';
import RedirectUnauthorized from './RedirectUnauthorized';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Button
} from '@material-ui/core';

export default function Report(props) {

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [popupTitle, setPopupTitle] = useState("");
    const [popupApplicants, setPopupApplicants] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const showApplicants = async (source, jobId) => {
        console.log(jobId);
        if (source === "APPLIED") {

            try {
                const getAppliedApplicants = await axios.get(endPointObj.url + "/employer/get-job-applicants?" + "jobId=" + jobId);

                console.log("Returned applications from backend: " + JSON.stringify(getAppliedApplicants.data));

                if (getAppliedApplicants.data.length>0) {
                    let currentApplicants = [];

                    getAppliedApplicants.data.map((applicant)=>{
                        currentApplicants.push({
                            applicantName: applicant.jobSeekerDetails.firstName + " " + applicant.jobSeekerDetails.lastName
                        });
                    });
                    setPopupApplicants(currentApplicants)
                    setPopupTitle("Applied");
                    setOpen(true);
                }
                else {

                }

            }
            catch (err) {
                console.log("Error in fetching applied applicants" + err);
            }
        }
        else if (source === "HIRED") {
            try {
                const getHiredApplicants = await axios.get(endPointObj.url + "/employer/get-job-applicants?" + "jobId=" + jobId+"&status="+"HIRED");

                console.log("Returned applications from backend: " + JSON.stringify(getHiredApplicants.data));

                if (getHiredApplicants.data.length>0) {
                    let currentApplicants = [];

                    getHiredApplicants.data.map((applicant)=>{
                        currentApplicants.push({
                            applicantName: applicant.jobSeekerDetails.firstName + " " + applicant.jobSeekerDetails.firstName
                        });
                    });
                    setPopupApplicants(currentApplicants)
                    setPopupTitle("Hired");
                    setOpen(true);
                }
                else {

                }

            }
            catch (err) {
                console.log("Error in fetching applied applicants" + err);
            }
        }
        else if (source === "REJECTED") {
            try {
                const getRejectedApplicants = await axios.get(endPointObj.url + "/employer/get-job-applicants?" + "jobId=" + jobId+"&status="+"REJECTED");

                console.log("Returned applications from backend: " + JSON.stringify(getRejectedApplicants.data));

                if (getRejectedApplicants.data.length>0) {
                    let currentApplicants = [];

                    getRejectedApplicants.data.map((applicant)=>{
                        currentApplicants.push({
                            applicantName: applicant.jobSeekerDetails.firstName + " " + applicant.jobSeekerDetails.firstName
                        });
                    });
                    setPopupApplicants(currentApplicants)
                    setPopupTitle("Rejected");
                    setOpen(true);
                }
                else {

                }

            }
            catch (err) {
                console.log("Error in fetching applied applicants" + err);
            }
        }
        else {

        }
    };
    const [jobs, setJobs] = useState([]);

    const applicants = [{ applicantName: 'Vineet Batthina' }, { applicantName: 'Jash' }, { applicantName: 'Jaineil' }, { applicantName: 'Shradha' }, { applicantName: 'Ratika' }, { applicantName: 'Siddharth' }]
    useEffect(async () => {
        try {
            let rows = [];

            const companyId = localStorage.getItem('companyId');

            const jobStatistics = await axios.get(endPointObj.url + "/employer/get-applicants-for-each-job/" + companyId);

            console.log("Returned applications from backend: " + JSON.stringify(jobStatistics.data));

            if (jobStatistics.data) {
                jobStatistics.data.map((job) => {
                    rows.push({
                        id: job.jobId,
                        jobId: job.jobId,
                        jobTitle: job.jobTitle,
                        applicantsApplied: job.numberOfApplicants,
                        applicantsHired: job.numberHired,
                        applicantsRejected: job.numberRejected
                    });
                })
                setJobs(rows);
            }
            else {

            }

        }
        catch (err) {
            console.log("Error in fetching employer" + err);
        }
    }, []);

    const columns = [
        {
            field: 'jobTitle',
            headerName: 'Job Title',
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
                        {params.value}
                    </Button>
                </strong>
            ),
        },
        {
            field: 'applicantsApplied',
            headerName: 'Applicants Applied',
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
                        onClick={() => {
                            showApplicants("APPLIED", params.row.jobId)
                        }}
                    >
                        {params.value}
                    </Button>
                </strong>
            ),
        },
        {
            field: 'applicantsHired',
            headerName: 'Applicants Selected',
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
                        onClick={() => {
                            showApplicants("HIRED", params.row.jobId)
                        }}
                    >
                        {params.value}
                    </Button>
                </strong>
            ),
        },
        {
            field: 'applicantsRejected',
            headerName: 'Applicants Rejected',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            showApplicants("REJECTED", params.row.jobId)
                        }}
                    >
                        {params.value}
                    </Button>
                </strong>
            ),
        },
    ];

    const rows = [
        { id: 1, jobTitle: "Job Title 1", applicantsApplied: "50", applicantsSelected: "10", applicantsRejected: "40" },
        { id: 2, jobTitle: "Job Title 2", applicantsApplied: "80", applicantsSelected: "1", applicantsRejected: "79" }
    ];


    return (
        <div>
            <RedirectUnauthorized />
            <Navbar current='reports' />
            <div style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <br />
                <Card sx={{ display: 'flex' }} style={{ width: '90%', marginTop: '1%', marginLeft: '5%', borderRadius: '15px', height: '50%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flex: '1 0 auto' }} style={{ width: '100%', marginRight: '10%', marginTop: '1%', height: '100%' }}>
                            <div style={{ height: '100%', width: '100%' }}>
                                <DataGrid rows={jobs} columns={columns} disableColumnMenu hideFooterSelectedRowCount={true} />
                            </div>
                        </CardContent>
                    </Box>
                </Card>
            </div>
            <React.Fragment>

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle style={{ fontWeight: 'bolder', backgroundColor: 'rgb(37, 87, 167)', color: '#ffffff', fontSize: 'xx-large' }}>{popupTitle}</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} style={{ marginTop: '2%' }}>
                                {
                                    popupApplicants.map((applicant) => {
                                        return (
                                            <Typography variant="h6" style={{ color: "#000000", fontFamily: 'Open Sans' }}>{applicant.applicantName}</Typography>
                                        );
                                    })
                                }
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{
                            width: "100%",
                            borderRadius: '8px',
                            height: "40px",
                            color: "#ffffff",
                            backgroundColor: "rgb(37, 87, 167)",
                            cursor: "pointer",
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '100%',
                        }} onClick={handleClose}>Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )

}