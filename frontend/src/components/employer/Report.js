import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';

import JobsTable from './RenderTable';
import { DataGrid } from '@mui/x-data-grid';

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


const showApplicant = (applicantId) => {
    console.log(applicantId);
}

export default function Report(props) {

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
                    >
                        {params.value}
                    </Button>
                </strong>
            ),
        },
        {
            field: 'applicantsSelected',
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
            <Navbar current='reports' />
            <div style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <br />
                <Card sx={{ display: 'flex' }} style={{ width: '90%', marginTop: '1%', marginLeft: '5%', borderRadius: '15px', height: '50%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flex: '1 0 auto' }} style={{ width: '100%',marginRight: '10%', marginTop: '1%', height: '100%' }}>
                            <div style={{ height: '100%', width: '100%' }}>
                                <DataGrid rows={rows} columns={columns} disableColumnMenu hideFooterSelectedRowCount={true} />
                            </div>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </div>
    )

}