import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';
import JobsTable from './RenderTable';
import endPointObj from '../../endPointUrl.js';
import axios from "axios";
import RedirectUnauthorized from './RedirectUnauthorized';

import {
    Box,
    Card,
    CardContent
} from '@material-ui/core';

export default function Jobs() {
    const classes = useStyles();

    const [jobs, setJobs] = useState([]);

    const columns = [
        { id: 'jobTitle', label: 'Job Title', minWidth: 170 },
        { id: 'industry', label: 'Industry', minWidth: 170 },
        { id: 'workType', label: 'Work Type', minWidth: 170 },
        { id: 'jobType', label: 'Job Type', minWidth: 170 },
        { id: 'jobAddress', label: 'Job Address', minWidth: 200 },
    ];

    const rows = [];
    
    useEffect(async () => {
        console.log("Jobs Fetch");
        const employerId = localStorage.getItem('userId');
        try {
            const employerJobs = await axios.get(endPointObj.url+ "/employer/get-job-list/" + employerId);
    
            console.log("Returned Jobs from backend: " + JSON.stringify(employerJobs));
            if(employerJobs.data){
                employerJobs.data.jobList.map((job)=>{
                    rows.push({
                        jobTitle : job.jobTitle,
                        industry : job.industry,
                        workType : job.remote ? "Remote" : "In Person",
                        workType : job.remote ? "Remote" : "In Person",
                        jobType : job.jobType,
                        jobAddress : job.jobLocation.city + ', ' +job.jobLocation.state,
                        rowId : job._id
                    });
                })
                setJobs(rows);
            }
            else{
                console.log("Fetch Jobs returned null");
            }
            console.log(rows);
        }
        catch (err) {
            console.log("Error in fetching employer"+err);
        }
        
    }, [])

    return (
        <div>
            <RedirectUnauthorized />
            {console.log(rows)}
            <Navbar current='dashboard' />
            <DashboardItems current="jobs" />
            <div style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <br />
                <Card sx={{ display: 'flex' }} style={{ width: '75%', marginTop: '1%', marginLeft: '15%', borderRadius: '15px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%' }}>
                            <JobsTable columns={columns} rows={jobs} pathname="/employer/candidates"/>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </div>
    )
}
