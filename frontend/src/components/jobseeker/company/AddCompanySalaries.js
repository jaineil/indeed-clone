import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import endPointObj from '../../../endPointUrl.js';
import {
  Grid,
  Container,
  makeStyles,
  OutlinedInput,
  Button,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import companyDetails from './companyDetails';
import CompanyHeader from './CompanyHeader';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import { AddCompanySalary } from "./AddCompanySalaries";
import { ReviewCard } from './ReviewCard';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none'
  },
  applyForm: {
    boxSizing: 'border-box',
    width: "600px",
    borderRadius: "10px",
    height: "1000px",
    backgroundColor: "white",
    outline: 'none',
    padding: '40px',
  },
  label: {
    marginBottom: "20px"
  },
  borderlinedInput: {
    border: "1px solid #cccccc",
    height: "35px",
    width: "400px",
    margin: "10px 0",
    borderRadius: 10
  },
  salaryContainer: {
    backgroundColor: "#f2f2f2",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxImg: {
    width: "450px",
    display: "flex",
    height: "40px",
    justifyContent: "center",
    margin: "60px 0 30px"
  },
}));

export function CompanyReview(props) {
  const classes = useStyles();
  const query = new URLSearchParams(props.location.search);
  const id = query.get('id')
  const dispatch = useDispatch()
  const { isAuth } = useSelector(state => state.login);
  const companyId = localStorage.getItem("currentcompanyid");
  const [companyName, setCompanyName] = React.useState("");
  const [isCurrentEmployee, setIsCurrentEmployee] = React.useState("");
  const [jobEndDate, setJobEndDate] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [jobLocation, setJobLocation] = React.useState("");
  const [annualSalary, setAnnualSalary] = React.useState("");
  const [yearsOfExperience, setYearsOfExperience] = React.useState("");
  const [paidTimeof, setPaidTimeof] = React.useState("");
  const [healthInsurance, setHealthInsurance] = React.useState("");
  const [lifeInsurance, setLifeInsurance] = React.useState("");
  const [dentalInsurance, setDentalInsurance] = React.useState("");
  const [retirement, setRetirement] = React.useState("");


  console.log("Company details: ", companyDetails);

  const postSalary = (e) => {
    e.preventDefault();
    console.log("Company id", localStorage.getItem("currentcompanyid"));
    console.log("Inside Post salary");

    // axios.post(endPointObj.url + '/job-seeker/company-details/add-review', data)
    //     .then(response => {
    //         console.log("Response after job review posting", response);
    //         this.setState({
    //             message: response.data.status
    //         });
    //     })
    //     .catch(err => {
    //         console.log("Error", err.response);
    //         if (err.response && err.response.data) {
    //             this.setState({
    //                 message: err.response.data
    //             });
    //         }
    //     });
  }

  const onCompanyNameChange = (e) => {
    setCompanyName(e.target.value)
  }

  return (

    isAuth ? (companyDetails ?
      <ThemeProvider theme={theme}>
        <Header />
        <Container className={classes.salaryContainer} maxWidth="xl">
          <br /><br />
          <div className={classes.applyForm} >

            <form onSubmit={postSalary}>
              <Grid item>
                <label style={{ display: "block" }}>
                  What’s your company name?
                </label>
                <OutlinedInput type="text" className={classes.borderlinedInput} required style={{ width: '500px' }}
                  onChange={onCompanyNameChange} value={companyName} />
              </Grid>

              {/* <UploadForm /> */}
              <Button type="submit" color='primary' style={{ marginRight: '30px', marginLeft: '100px', backgroundColor: 'rgb(37, 87, 167)', color: '#ffffff' }}>Add Salary Details</Button>
              <Button variant='outlined'>cancel</Button>
            </form>

          </div>


        </Container>
      </ThemeProvider>
      : <></>) : <Redirect to="/login" />
  )
}
export default CompanyReview;