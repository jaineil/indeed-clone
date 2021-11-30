import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getCompanyReviews } from '../../Redux/CompanyReviews/action';
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import { Grid, 
    Container,
    makeStyles,
    Typography,
    Button,
    withStyles
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import companyDetails from './companyDetails';
import CompanyHeader from './CompanyHeader';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";


const useStyle = makeStyles((theme) => ({
    imgCont: {
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    optionTab: {
        cursor: "pointer",
        margin: "0 40px 0 40px",
        fontWeight: "bold"
    },
    scoreTest: {
        margin: 0,
        backgroundColor: "#f3f2f1",
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#2d2d2d",
        borderRadius: "0.5rem",
        lineHeight: "1.5",
        padding: "0.35rem 0.75rem"
    }
}))



export function CompanyHome(props) {
    const classes = useStyle();
    const [reviews, setReviews] = useState([]);
    const query = new URLSearchParams(props.location.search);
    const id =query.get('id')
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state=>state.login)
    
    //Call Company snapshot API
    //fetch company id by localstorage
    console.log("Company details: ", companyDetails);

    return (

         isAuth ? (companyDetails ?
        <ThemeProvider theme={theme}> 
            <Header /><hr/>
            <CompanyHeader /><hr/>   
        <Container maxwidth = "xl">
            <Grid item style = {{marginTop: "20px", marginBottom: "30px"}} >
                <Typography variant = "caption" >{companyDetails[0].companyName}</Typography>
            </Grid>

            {/* Work happiness */}
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography variant = "h5"><b>Work happiness</b></Typography>
            </Grid>

            <Grid container style = {{height: "40px", paddingLeft: "250px", marginBottom: "130px"}}>
                <Grid item className = {classes.optionTab} style = {{height: "20px", width: "60px"}}>
                    <div className = {classes.scoreTest}>{companyDetails[0].avgWorkHappinessScore}</div> <br/> 
                    <div style = {{height: "20px", width: "160px", fontSize: "20px"}}>Work Happiness Score </div>
                </Grid> 
                <Grid item className = {classes.optionTab} style = {{height: "20px", width: "60px",marginLeft:"100px"}}>
                <div className = {classes.scoreTest}>{companyDetails[0].avgLearningScore}</div> <br/>
                <div style = {{height: "20px", width: "160px", fontSize: "20px"}}>Learning</div>
                </Grid>
                <Grid item className = {classes.optionTab} style = {{height: "20px", width: "60px", marginLeft:"100px"}}>
                <div className = {classes.scoreTest}>{companyDetails[0].avgAppreciationScore}</div> <br/>
                <div style = {{height: "20px", width: "160px", fontSize: "20px"}}>Appreciation</div>
                </Grid>
            </Grid>
            
            {/* About the Company */}
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography variant = "h5"><b>About the company</b></Typography>
            
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography><p>{companyDetails[0].aboutTheCompany}</p></Typography>
            </Grid>

            <Grid container style = {{height: "40px", paddingRight: "100px", marginBottom: "380px"}} spacing={1}>
                <table>
                <tr> 
                <td>
                <Grid item style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "40px",marginLeft:"200px"}} >
                    <div style = {{fontWeight: "600"}}>
                               <h5> CEO </h5>
                    </div>
                    <div> 
                        {companyDetails[0].ceo}
                    </div>
                </Grid>
                </td>
                <td>
                <Grid item style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "40px",marginLeft:"200px"}}>
                    <div style = {{fontWeight: "600"}}>
                               <h5> Founded </h5>
                    </div>
                    <div> 
                        {companyDetails[0].founded}
                    </div>
                </Grid>
                </td>
                <td>
                <Grid item style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "40px",marginLeft:"200px"}}>
                    <div style = {{fontWeight: "600"}}>
                               <h5> Revenue </h5>
                    </div>
                    <div> 
                        {companyDetails[0].revenue}
                    </div>
                </Grid>
                </td>
                
                </tr>
                <br/><br/><br/>
                <tr> 
                <td>
                <Grid item style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "40px",marginLeft:"200px"}}>
                    <div style = {{fontWeight: "600"}}>
                               <h5> Industry </h5>
                    </div>
                    <div> 
                        {companyDetails[0].industry}
                    </div>
                </Grid>
                </td>
                <td>
                <Grid item style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "40px",marginLeft:"200px"}}>
                    <div style = {{fontWeight: "600"}}>
                               <h5> Company Size </h5>
                    </div>
                    <div> 
                        {companyDetails[0].companySize}
                    </div>
                </Grid>
                </td>
                
                </tr> 
                </table>
            </Grid>
            </Grid>

            
            <Grid item style = {{marginTop: "20px", marginBottom: "40px"}}>
                <Typography variant = "h5"><b>Company Description</b></Typography>
            </Grid> 
            
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography><p>{companyDetails[0].companyDescription}</p></Typography>
            </Grid>

            <Grid item style = {{marginTop: "20px", marginBottom: "30px"}}>
                <Typography variant = "h5"><b>Company Mission</b></Typography>
            </Grid> 
            
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography><p>{companyDetails[0].companyMission}</p></Typography>
            </Grid>

            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography variant = "h5"><b>Reviews</b></Typography>
            </Grid>
        </Container>
        </ThemeProvider>
        : <></>) :  <Redirect to="/login" /> 
    )
}
export default CompanyHome;