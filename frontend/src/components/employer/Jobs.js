import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';

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

    return (
        <Container className={classes.registrationContent} maxWidth="xl">
            <Navbar current='dashboard'/>
            <DashboardItems current="jobs"/>
        </Container>
    )
}
