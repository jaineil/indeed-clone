import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';
import CandidatesTable from './RenderTable';

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

export default function ViewApplication(props) {
    const classes = useStyles();

    const [applicantInfo, setApplicantInfo] = useState([]);

    useEffect(() => {
        console.log("Applicant Fetch");
    }, applicantInfo)

    return (
        <div>
            <Navbar current='dashboard' />
            <div style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                Applicant Info will be displayed here
            </div>
        </div>
    )
}
