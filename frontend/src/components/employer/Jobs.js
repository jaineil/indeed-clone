import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';
import JobsTable from './RenderTable';

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

export default function Jobs() {
    const classes = useStyles();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        console.log("Jobs Fetch");
    }, jobs)

    const columns = [
        { id: 'jobTitle', label: 'Job Title', minWidth: 170 },
        { id: 'industry', label: 'Industry', minWidth: 170 },
        { id: 'workType', label: 'Work Type', minWidth: 170 },
        { id: 'jobType', label: 'Job Type', minWidth: 170 },
        { id: 'jobAddress', label: 'Job Address', minWidth: 200 },
    ];

    const rows = [
        { jobTitle: "Job Title 1", industry: "Industry 1", workType: "Work Type 1", jobType: "Job Type 1", jobAddress: "Job Address 1", rowId:"Job ID 1" },
        { jobTitle: "Job Title 2", industry: "Industry 2", workType: "Work Type 2", jobType: "Job Type 2", jobAddress: "Job Address 2", rowId:"Job ID 2" }
    ];

    return (
        <div>
            <Navbar current='dashboard' />
            <DashboardItems current="jobs" />
            <div style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <br />
                <Card sx={{ display: 'flex' }} style={{ width: '75%', marginTop: '1%', marginLeft: '15%', borderRadius: '15px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%' }}>
                            <JobsTable columns={columns} rows={rows} pathname="/candidates"/>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </div>
    )
}
