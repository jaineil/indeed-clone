import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import {
    Box,
    Container,
    Typography,
    AppBar,
    Toolbar,
    makeStyles,
    Button,
    withStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function DashboardItems(props) {
    const classes = useStyles();

    return (
        <AppBar elevation={0} style={{ marginTop: '4%', background: '#ffffff' }}>
            <Toolbar className={classes.toolbar} >
                <Container className={classes.header_container} disableGutters maxWidth={false}>
                    <Box className={classes.header_left} style={{ marginTop: '1%' }}>
                        <Box style={{ marginLeft: '10%' }} >
                            <Typography variant='h6' component={Link} to='/employer' style={{ textDecoration:'none', fontSize: '100%', fontFamily: 'Open Sans', color: props.current === "jobs" ? '#2557a7' : '#2d2d2d', fontWeight: 'bold' }}>
                                Jobs
                            </Typography>
                        </Box>
                        <Box style={{ marginLeft: '25%' }} >
                            <Typography variant='h6' hidden={props.current!=='candidates'} component={Link} to='/employer/candidates' style={{ textDecoration:'none', fontSize: '100%', fontFamily: 'Open Sans', color: props.current === "candidates" ? '#2557a7' : '#2d2d2d', fontWeight: 'bold' }}>
                                Candidates
                            </Typography>
                        </Box>
                        <Box style={{ marginLeft: props.current === "candidates" ? '25%' : '0%' }} >
                            <Typography variant='h6' component={Link} to='/employer/messages' style={{ textDecoration:'none', fontSize: '100%', fontFamily: 'Open Sans', color: props.current === "messages" ? '#2557a7' : '#2d2d2d', fontWeight: 'bold' }}>
                                Messages
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={classes.header_right}>
                        <Box style={{ marginTop: '5%', marginLeft:'30%' }} >
                            <Button type="submit" className={classes.postJobButton} component={Link} to="/employer/postJob">
                                Post a Job
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
