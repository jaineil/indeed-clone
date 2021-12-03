import React, { useEffect, useState, useReducer } from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SearchJobForm from '../Landing/SearchJobForm';
import { getJobSearchData } from '../../../_actions/jobSearchActions';
import JobDescription from '../jobs/JobDescription';
import JobMenu from '../jobs/JobMenu';
import Header from "../../common/Header";
import theme from "../../common/MenuTheme";
import { ThemeProvider } from "@material-ui/core";
import JwPagination from 'jw-react-pagination';
import CompanyHeader from './CompanyHeader'

const useStyles = makeStyles(theme => ({
    jobContainer: {
        width: '450px',
    },
    card: {
        border: '1px solid black',
        padding: '15px',
        cursor: 'pointer',
        position: 'relative',
        height: '100px',
        marginBottom: '20px',
        '&:hover': {
            '& $job_title': {
                textDecoration: 'underline'
            }
        },
        borderRadius: '10px'
    },
    job_title: {
        fontWeight: 'bold',
        fontSize: '20px'
    },
    job_subTitle: {
        fontSize: '16px'
    },
    job_snippet: {
        margin: '20px 0px 10px 0px',
        fontSize: '15px',
        lineHeight: '1.4rem'
    },
    greyText: {
        fontSize: '16px',
        color: 'grey'
    },
    job_section: {
        //padding: '0 8vw',
        position: 'relative'
    },
    sortStyle: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    bold: {
        fontWeight: 'bolder',
        cursor: 'pointer',
    }
}))

function DisplayJobs(props) {

    const query = new URLSearchParams(props.location.search)
    const {isAuth} = useSelector(state=>state.login);
    const classes = useStyles()

    let job = query.get('q') || ""
    let location = query.get('location') || ""


    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    let jobs = useSelector(state => state.search.searchedJobs)
    let totalCount = useSelector(state => state.search.totalCount)
    const loggedUser = useSelector(state => state.login.loggedUser);
    let isLoading = useSelector(state => state.search.isLoading);
    let userId = localStorage.getItem("userId");
    console.log("Inside display jobs: searchedJobs", jobs);
    console.log("Inside display jobs: searchcount", totalCount);

    const pageNo = query.get('page')
    let [page, setPage] = useState(Number(pageNo))
    let [pageOfItems, setPageOfItems] = useState([])



    let [jobData, setJobData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getJobSearchData(job, location, page))
        forceUpdate()
    }, [job, location, page])


    const getJobDescription = (job) => {
        setJobData(job)
    }

    return (
        <ThemeProvider theme={theme}>
            {isAuth ? (<Header />): <><br/><br/></> }
			<br/>
            <CompanyHeader /> <br/><br/>
            <Container className={classes.job_section}>
                
                <SearchJobForm /> <br />
                {
                    isLoading ? (
                        <></>
                    ) : jobs.length ? (

                        <>
                        
                            {ignored ? null : null}

                            <Box style={{ display: 'flex', height:'600px' }}>

                                <Grid className={classes.jobContainer} container>
                                    {
                                        pageOfItems.map((job, index) =>
                                            <Grid className={classes.card} item key={job.jobId} lg={12} md={12} sm={12} xs={12} >
                                                <Box onClick={() => getJobDescription(job)} >
                                                    <Typography className={classes.job_title}>
                                                        {job.jobTitle}
                                                    </Typography>
                                                    <Typography className={classes.job_subTitle}>
                                                        {job.companyName}
                                                    </Typography>
                                                    <Typography className={classes.job_subTitle}>
                                                        {job.city}, {job.state}
                                                    </Typography>

                                                </Box>
                                            </Grid>)
                                    }

                                </Grid>
                                <Grid>
                                {
                                    jobData ? <JobDescription jobData={jobData} summary={job.jobDescription} /> : <></>
                                }
                                </Grid>
                            </Box>


                            <JwPagination pageSize={5} items={jobs} onChangePage={setPageOfItems} />
                        </>
                    ) : <Box>No results found</Box>
                }

            </Container>
        </ThemeProvider>
    );

}

export default DisplayJobs;