import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import { Box, Container } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import { Link, Redirect } from 'react-router-dom';
import employerLogo from './Indeed_employer_icon.png'; 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#2d2d2d',
    },
    toolbar: {
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        height: '50px'
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
    navigation: {
        width: '350px',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '30px'
    },
    header_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header_left: {
        display: 'flex',
    },
    header_right: {
        display: 'flex',
        width: '250px',
    },
    link: {
        marginLeft: '14px',
        '& a': {
            marginLeft: '20px'
        }
    }
}));

export default function Navbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar elevation={0} style={{ background: '#2d2d2d' }} position="fixed">
                <Toolbar className={classes.toolbar} >
                    <Container className={classes.header_container} disableGutters maxWidth={false}>
                        <Box className={classes.header_left}>
                            <img className={classes.logo}
                                src={employerLogo}
                                style={{marginTop: props.current==='dashboard' ? '4%' : '0%' }}
                            />
                            <Box style={{ marginLeft: '5%', marginTop:'3%'}} >
                                <Typography variant='h6' component={Link} to="/employer" style={{ textDecoration: 'none', fontSize: '100%', marginLeft:'10%',fontFamily:'Open Sans', color:"#ffffff"}}>
                                    Dashboard
                                </Typography>
                                <hr hidden= {!(props.current==='dashboard')} style={{marginLeft: '10%', borderColor : '#1e6ce8', width:'100%'}} /> 
                            </Box>
                        </Box>
                        <Box className={classes.header_right} style={{marginBottom: props.current==='dashboard' ? '0.5%' : '0%' }} >

                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                style={{marginRight:'5%'}}
                                component={Link} to="/profile"
                            >
                                <ForumIcon />
                            </IconButton>

                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                style={{marginRight:'5%'}}
                                component={Link} to="/messages"
                            >
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                style={{marginRight:'5%'}}
                                component={Link} to="/profile"
                            >
                                <PersonIcon />
                            </IconButton>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>

        </div>
    );
}