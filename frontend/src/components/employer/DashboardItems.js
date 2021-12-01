import React, { useState, useEffect } from 'react';

import {
    Box,
    Container,
    Typography,
    AppBar,
    Toolbar,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header_left: {
        display: 'flex',
    },
}));

export default function DashboardItems(props) {
    const classes = useStyles();

    return (
        <AppBar elevation={0} style={{marginTop:'4%', background:'#ffffff'}}>
                <Toolbar className={classes.toolbar} >
                    <Container className={classes.header_container} disableGutters maxWidth={false}>
                        <Box className={classes.header_left}>
                            <Box style={{ marginLeft: '10%' }} >
                                <Typography variant='h6' to='/employer' style={{ fontSize: '100%',fontFamily:'Open Sans', color: props.current === "jobs" ? '#2557a7' : '#2d2d2d' , fontWeight:'bold'}}>
                                    Jobs
                                </Typography>
                            </Box>
                            <Box style={{ marginLeft: '25%' }} >
                                <Typography variant='h6' to='/employer' style={{ fontSize: '100%',fontFamily:'Open Sans' , color: props.current === "candidates" ? '#2557a7' : '#2d2d2d', fontWeight:'bold'}}>
                                    Candidates
                                </Typography>
                            </Box>
                            <Box style={{ marginLeft: '25%' }} >
                                <Typography variant='h6' to='/employer' style={{ fontSize: '100%',fontFamily:'Open Sans', color: props.current === "messages" ? '#2557a7' : '#2d2d2d', fontWeight:'bold'}}>
                                    Messages
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
    )
}
