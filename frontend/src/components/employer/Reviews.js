import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import endPointObj from '../../endPointUrl.js';

import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
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

    return (
        <div>
            <Navbar current='reviews' />
        </div>
    )

}
